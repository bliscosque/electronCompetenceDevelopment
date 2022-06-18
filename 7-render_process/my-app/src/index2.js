const janela2= document.getElementById('janela2')
janela2.addEventListener('click', function(event) {
    //const {BrowserWindow} = require('electron').remote //older versions
    const {BrowserWindow} = require('@electron/remote')
    const win2=new BrowserWindow({width: 400, height: 400})
    win2.loadFile('src/index2.html')
})

const janela3= document.getElementById('janela3')
janela3.addEventListener('click', function(event) {
    //const {BrowserWindow} = require('electron').remote //older versions
    const {BrowserWindow} = require('@electron/remote')
    const win3=new BrowserWindow({width: 800, height: 600, backgroundColor: 'black', frame:false})
    win3.loadFile('src/index2.html')
})