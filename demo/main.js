const {app, BrowserWindow } = require('electron')

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(`file://${app.getAppPath()}/index.html`)
  mainWindow.on('closed', () => mainWindow = null)
})
