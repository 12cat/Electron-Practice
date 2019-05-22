'use strict'

let document

// 渲染模板实例
function displayFile (file) {
  const mainArea = document.getElementById('main-area')
  const template = document.querySelector('#item-template')
  let clone = document.importNode(template.content, true)
  clone.querySelector('img').src = `image/${file.type}.ico`
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
  displayFiles
}
