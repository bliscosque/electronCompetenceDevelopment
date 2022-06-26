const video = document.querySelector('video')
const aufnahme = []
let mediaRecorder
const fs = require("fs")
const pfad = require("path")

const { ipcRenderer } = require('electron')


const checkbox = document.getElementById('switch')
function checkVideo(checkbox)
{
    if (checkbox.checked)
    {
        starteVorschau()
    }
    else
    {
        video.srcObject = null
    }
}

// Starte Vorschau
async function starteVorschau()
{
const desktopCapturer = {
    getSources: (opts) => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
  }
    //Stream erstellen
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                minWidth: 700,
                maxWidth: 700,
                minHeight: 400,
                maxHeight: 400
            }
        }
    })

    // Video Ausgabe im Frontend
    video.srcObject = stream
    video.play()

    //Media Recorder
    const options = { mimeType: 'video/webm; codecs=vp9'}
    mediaRecorder = new MediaRecorder(stream, options)
    mediaRecorder.ondataavailable = verarbeiteAufnahme
    mediaRecorder.onstop = dateiSpeichern

}

//Aufnahme verarbeiten
function verarbeiteAufnahme(e)
{
    aufnahme.push(e.data)
}

//Buttons
const startBtn = document.getElementById('startBtn')
//startBtn.addEventListener('click', function()){}
startBtn.onclick = e =>{
    mediaRecorder.start()
    startBtn.innerText = 'Aufnahme'
}

const stopBtn = document.getElementById('stopBtn')
stopBtn.onclick = e =>{
    mediaRecorder.stop()
    startBtn.innerText = 'Start'
}

//Datei speicher
async function dateiSpeichern(e){
    const blob = new Blob(aufnahme, {
        type: 'video/webm; codecs=vp9'
    })
    const buffer = Buffer.from(await blob.arrayBuffer())
    let datei = pfad.join(__dirname, "/../video.webm")
    fs.writeFile(datei, buffer, () => console.log("Datei gespeichert"))
}
