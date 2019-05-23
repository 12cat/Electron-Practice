const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app

let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(`file://${app.getAppPath()}/index.html`)
  mainWindow.on('closed', () => mainWindow = null)
})
