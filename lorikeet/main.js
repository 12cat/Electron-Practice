'use strict'

// 通过 npm 加载 electron
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// 应用主窗口
let mainWindow = null

// 窗口关闭时，关闭应用（mac、os系统不会关闭应用）
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// 应用运行时，加载主窗口，加载 index.html 文件内容，文件关闭时清空主窗口变量
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(`file://${app.getAppPath()}/index.html`)
  mainWindow.on('closed', () => { mainWindow = null })
})
