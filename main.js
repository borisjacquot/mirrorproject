const { app, BrowserWindow } = require('electron')
const meteo = require('./modules/meteo.js');
const compliment = require('./modules/compliment.js');
const calendar = require("./modules/calendar_module");
const news = require("./modules/news_module");

// calendar.download_calendar(); // on dl le calendar
// console.log(news.news()); // TODO
// console.log(calendar.calendar());

function createWindow () {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        /* fullscreen: true, */
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./public/index.html');

    let i = 0;
    setInterval(() => {
        win.webContents.send('compl', compliment.compliment(i));
        i++;
        if (i > 3) i = 0;
    },10000);

    // meteo
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
