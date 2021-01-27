const { app, BrowserWindow } = require('electron')
const meteo = require('./modules/meteo.js');

function createWindow () {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./public/index.html');

    setInterval(() => {
        win.webContents.send('temp', meteo.temp());
    },1000);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
