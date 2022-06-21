const { app, BrowserWindow, ipcMain } = require('electron') 
const path = require('path');
const find = require('find-process');
const url = require('url');
const isDev = require('electron-is-dev')
let win

function createWindow () { 
  win = new BrowserWindow({ 
    width: 1200, 
    height: 900, 
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation : false
    } 
  }) 

  win.loadURL(
    isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // win.loadURL("http://localhost:3000");
  win.webContents.openDevTools();
} 

app.whenReady().then(() => { 
  createWindow() 
}) 

app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})

ipcMain.on('toggle-debug', (event, arg) => {
  win.webContents.toggleDevTools()
})

app.on('before-quit' , (e) => {
  find('port',3000)
    .then(function (list) {
      if(list[0] != null){
        process.kill(list[0].pid, 'SIGHUP');
      }
    })
    .catch((e) => {
      console.log(e.stack || e);
    })
})