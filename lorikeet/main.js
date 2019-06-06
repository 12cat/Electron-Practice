'use strict'

// 通过 npm 加载 electron
const electron = require('electron')
const app = electron.app
const globalShortcut  = electron.globalShortcut
const Menu = electron.Menu
const Tary = electron.Tray
const BrowserWindow = electron.BrowserWindow

// 应用主窗口
let mainWindow = null
let appIcon = null

// 窗口关闭时，关闭应用（mac、os系统不会关闭应用）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 
function displayNote (note) {
  mainWindow.webContents.send('displayNote', note)
}

// 应用运行时，加载主窗口，加载 index.html 文件内容，文件关闭时清空主窗口变量
app.on('ready', () => {
  
  mainWindow = new BrowserWindow({
    // x: 100, y: 100,
    width: 800, height: 600,
    // minWidth: 800, minHeight: 600,
    // maxWidth: 800, maxHeight: 600,
    // fullscreen: true, // 窗口最大化
    // frame: false, // 无边框frameless窗口
    // transparent: true, // 透明应用窗口
    // resizable: false, // 是否允许拉伸大小
    // kiosk: true, // kiosk 最大化 F11
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(`file://${app.getAppPath()}/index.html`)

  // 创建托盘图标，设置托盘title
  appIcon = new Tary('icon1.png')
  appIcon.setToolTip('12cat')

  // 托盘图片右键菜单
  appIcon.setContextMenu(Menu.buildFromTemplate([
    {label: '退出', click: () => mainWindow.destroy()}
  ]))
  // 托盘图标点击事件
  appIcon.on('click', () => {
    mainWindow.show()
    mainWindow.setSkipTaskbar(false) // 让窗口在任务栏中显示
  })

  // 绑定快捷键
  globalShortcut.register('CommandOrControl+Z', () => {
    console.log('CommandOrControl + Z')
  })

  // 托盘图标闪烁
  let count = 0;
  setInterval (() => {
    if (count++ % 2 == 0) appIcon.setImage('icon1.png')
    else appIcon.setImage('icon2.png')
  }, 400)

  // 关闭系统，最小化到托盘
  mainWindow.on('close', event => {
    mainWindow.hide() // 隐藏浏览器窗口
    event.preventDefault() // 禁止关闭行为
    mainWindow.setSkipTaskbar(true) // 让窗口不在任务栏中显示
  })
  mainWindow.on('closed', () => {
    mainWindow = null
    // 取消绑定快捷键
    globalShortcut.unregister('CommandOrControl+Z')
  })
})
