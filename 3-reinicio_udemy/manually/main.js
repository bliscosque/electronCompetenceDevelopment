const {app, BrowserWindow, Menu, shell } = require('electron')

function createWindow() {
    const win=new BrowserWindow( {
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('index.html')

    const template = [
        {
            label: "Menu 1",
            submenu: [
                { label: "Info1",
                  click: function() {
                    console.log('Click em Info1!');
                  }
                },
                { label: "Documentacao", click() {
                    shell.openExternal('https://www.electronjs.org/docs/latest/api/menu');
                } },
                { type: "separator" },
                { label: "Quit", click() {
                    app.quit();
                } },
            ]
        },
        {
            label: "Segundo Menu",
            submenu: [
                {role: "selectAll", label: "Selecionar Tudo"}
            ]

        }
    ];
    const menu=Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})