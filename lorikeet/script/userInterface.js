'use strict'

let document
const fileSystem = require('./fileSystem')

// 显示当前文件夹路径
function displayFolderPath (folderPath) {
  document.getElementById('current-folder').innerText = folderPath
}

// 移除 main-area div 中的内容
function clearView () {
  const mainArea = document.getElementById('main-area')
  let firstChild = mainArea.firstChild
  while (firstChild) {
    mainArea.removeChild(firstChild)
    firstChild = mainArea.firstChild
  }
}

// 修改当前路径，并更新主区域内容
function loadDirectory (folderPath) {
  return function (window) {
    if (!document) document = window.document
    displayFolderPath(folderPath)
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
      clearView()
      if (err) return alert('Sorry, you could not load your folder')
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles)
    })
  }
}

// 渲染模板实例
function displayFile (file) {
  const mainArea = document.getElementById('main-area')
  const template = document.querySelector('#item-template')
  let clone = document.importNode(template.content, true)
  clone.querySelector('img').src = `image/${file.type}.ico`
  if (file.type === 'directory') {
    clone.querySelector('img').addEventListener('dblclick', () => {
      loadDirectory(file.path)()
    }, false)
  }
  clone.querySelector('.filename').innerText = file.file
  mainArea.appendChild(clone)
}

// 创建 displayFiles 函数显示文件列表信息
function displayFiles(err, files) {
  if (err) {
    return alert('Sorry, we could not load your home folder')
  }
  files.forEach(displayFile)
}

function bindDocument (window) {
  if (!document) document = window.document
}

module.exports = {
  bindDocument,
  displayFiles,
  loadDirectory
}
