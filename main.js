const { app, BrowserWindow } = require('electron')
const meteo = require('./modules/meteo.js');
const spotify = require('./modules/spotify.js');
const compliment = require('./modules/compliment.js');
const date_ob = require('./modules/date.js');
const calendar = require("./modules/calendar_module");
const news = require("./modules/news_module");
const {ipcMain}  = require('electron');

calendar.download_calendar(); // on dl le calendar
// console.log(news.news()); // TODO

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

    // spotify
    setInterval(async () => {
        const song = await spotify.spotify();
        win.webContents.send('spotify',song);
    },1000);

    // news
    let j = 0;
    setInterval(() => {
        const newstab = news.news();
        win.webContents.send('news', newstab[j]);
        j++;
        if ( j!= undefined && j > newstab.length ) j = 0;
    },5000);

    // calendar
    setInterval(() => {
        const calendartab = calendar.calendar();
        win.webContents.send('calendar', calendartab[0]);
    },1000);

    // clock
    setInterval(() => {
        let date= new Date();
        const complete_date = date.getDate() + " " + date_ob.month(date.getMonth()+1) + " " + date.getFullYear(); 
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const hour = date.getHours() + ":" + minutes;
        const date_plus_hour = {"date": complete_date,"hour": hour}
        win.webContents.send('date',date_plus_hour);
    },1000);
    
}  

// minuteur
ipcMain.on("btnclick",function (event, arg) {
    let time = arg;
    setInterval(function() { 
        if(time==0){return;}
        time--; 
        event.sender.send("timer", time); 
    }, 1000);
})

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

