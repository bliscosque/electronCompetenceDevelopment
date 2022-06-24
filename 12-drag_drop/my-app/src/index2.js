const { app, BrowserWindow,ipcRenderer } = require("electron");
const path=require('path')

//funcao drop
let dropPath=''
document.addEventListener('drop', (event) =>{
    event.preventDefault()
    event.stopPropagation() //nao executa mais uma vez

    for (const f of event.dataTransfer.files) {
        dropPath=f.path
        console.log('Caminho do arquivo: ',dropPath)
        document.getElementById("drag").innerHTML = path.basename(dropPath)
    }
})

document.addEventListener('dragover', (event) => {
    event.preventDefault()
    event.stopPropagation()
})
document.addEventListener('dragenter', (event) => {
    console.log('arquivo ingressando')
})
document.addEventListener('dragleave', (event) => {
    console.log('deixando o html')
})


//funcao de drag
document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault(),
    ipcRenderer.send('ver-arquivo', dropPath)
}