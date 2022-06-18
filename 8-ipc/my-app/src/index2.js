const { app, BrowserWindow, ipcRenderer } = require('electron');


const asyncB = document.getElementById('asyncB')

const syncB = document.getElementById('syncB')
syncB.addEventListener('click', function(event) {
    console.log('Sync1')
    console.log(ipcRenderer.sendSync('noticia-sync'))
    console.log('Sync2')
})

asyncB.addEventListener('click', function(event) {
    console.log('Sync1');
    ipcRenderer.send('noticia-async');
    console.log('Sync2')
})


ipcRenderer.on('resposta-async', function(event, arg) {
    console.log(arg)
})