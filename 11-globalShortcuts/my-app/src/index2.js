const { app, BrowserWindow,ipcRenderer } = require("electron");
const fs=require('fs')
const path=require('path')
let pathName=path.join(__dirname, "/../assets")

const remote=require('@electron/remote')
const dialog=remote.dialog

const nomeArquivo=document.getElementById('nomeArquivo')
const conteudo=document.getElementById('conteudo')
const salvar=document.getElementById('salvar')
const abrir=document.getElementById('abrir')
const apagar=document.getElementById('apagar')

ipcRenderer.on('texto-inicio', (event)=>{
    //alert('noticia recebida')
    ipcRenderer.sendSync('texto-resposta', conteudo.value)
})

salvar.addEventListener('click', function() {
    let arquivo=path.join(pathName, nomeArquivo.value)
    let conteudoarquivo=conteudo.value
    fs.writeFileSync(arquivo,conteudoarquivo,function(err) {
        if (err) {
            return console.log(err)
        }
        console.log('arquivo salvo')
    })
})

abrir.addEventListener('click', function() {
    dialog.showOpenDialog(remote.getCurrentWindow(), {
        properties: ["openFile"],
        filters: [{name: 'Texto', extensions: ['txt','html','js']}]
    }).then(result=> {
        if (result.canceled === false) {
            let pathArquivo=result.filePaths[0]

            fs.readFile(pathArquivo, function(err,conteudoarquivo) {
                if (err) {
                    return console.log(err)
                }
                conteudo.value=conteudoarquivo.toString()
                nomeArquivo.value=path.basename(result.filePaths[0])
            })
        }
    }).catch(err => {
        console.log(err)
    })
})


apagar.addEventListener('click', function() {
    let arquivo=path.join(pathName, nomeArquivo.value)
    fs.unlink(arquivo,function(err) {
        if (err) {
            return console.log(err)
        }
        console.log('arquivo apagado')
        nomeArquivo.value=''
        conteudo.value=''
    })
})