'use strict'

const fileSystem = require('./script/fileSystem')
const userInterface = require('./script/userInterface')

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

window.onload = main
