'use strict'

const fileSystem = require('./script/fileSystem')
const userInterface = require('./script/userInterface')
const remote = require('electron').remote

// const notifier = require('electron-notifications')

// main
function main () {
  userInterface.bindDocument(window)
  let folderPath = fileSystem.getUsersHomeFolder()
  userInterface.loadDirectory(folderPath)(window)

  if (!document) document = window.document
  document.onkeydown = function (e) {  
    var ev = document.all ? window.event : e;
    if (ev.keyCode === 8) {
      let arr = document.getElementById('current-folder').textContent.split('\\')
      if (arr.length >= 3) arr = arr.slice(0, arr.length - 1)
      userInterface.loadDirectory(arr.join('\\'))(window)
    }
  }
}


function notify () {
  console.log(1111)
  let nty = new Notification('标题', {
    title: 'biaoti',
    body: 'neirong'
  })
  nty.onshow = () => console.log('nty show')
  nty.onclick = () => console.log('nty click')
  nty.onclose = () => console.log('nty close')
}

// 控制窗口最大化
function toggleFullScreen () {
  const button = document.getElementById('fullscreen')
  const win = remote.getCurrentWindow()
  if (win.isFullScreen()) {
    win.setFullScreen(false)
    button.innerText = 'Go full screen'
  } else {
    win.setFullScreen(true)
    button.innerText = 'Exit full screen'
  }
}

// kiosk 最大化 F11
function togglerKiosk () {
  const button = document.getElementById('kiosk')
  const win = remote.getCurrentWindow()
  if (win.isKiosk()) {
    win.setKiosk(false)
    button.innerText = 'Enter kiosk mode'
  } else {
    win.setKiosk(true)
    button.innerText = 'Exit kiosk mode'
  }
}

window.onload = main
