const { app, BrowserWindow, dialog, Menu, shell, ipcMain, globalShortcut } = require("electron");
const fs=require('fs')
let conteudo='Conteudoteste'
const path = require("path");
const remote = require("@electron/remote/main");
remote.initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  globalShortcut.register('Alt+0', ()=> {
    mainWindow.focus();
  })

  const template = [
    {
      label: "Arquivo",
      submenu: [
        {
          label: "Salvar",
          click: function () {
            mainWindow.webContents.send('texto-inicio')
            ipcMain.on('texto-resposta', (event, arg) => {
              conteudo=arg
            } )

            dialog.showSaveDialog({}).then((result)=>{
              fs.writeFileSync(result.filePath, conteudo, (err) => {

              })
            }).catch((err) => {

            })
          }, accelerator: 'CmdOrCtrl + s'
        },
        {
          label: "Documentacao",
          click() {
            shell.openExternal("https://www.electronjs.org/docs/latest/api/menu");
            //shell.openPath('/home/thiago/vscode/electron/11-globalShortcuts/my-app/assets');
            //shell.showItemInFolder('/home/thiago/vscode/electron/11-globalShortcuts/my-app/assets/teste.txt')
          }, accelerator: 'CmdOrCtrl + k'
        },
        { type: "separator" },
        {
          role: "quit",
          label: 'fechar'
        },
      ],
    },
    {
      label: "Segundo Menu",
      submenu: [{ role: "selectAll", label: "Selecionar Tudo" }],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  remote.enable(mainWindow.webContents);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  globalShortcut.unregisterAll()
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
