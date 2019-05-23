'use strict'

const async = require('async')
const fs = require('fs')
const osenv = require('osenv')
const path = require('path')

// 获取用户目录
function getUsersHomeFolder () {
  return osenv.home()
}

// 读取目录内容
function getFilesInFolder (folderPath, cb) {
  fs.readdir(folderPath, cb)
}

// 使用 path 模块获取文件名
function inspectAndDescribeFile (filePath, cb) {
  let result = {
    file: path.basename(filePath),
    path: filePath,
    type: ''
  }
  fs.stat(filePath, (err, stat) => {
    if (err) {
      cb(err)
    } else {
      if (stat.isFile()) result.type = 'file'
      if (stat.isDirectory()) result.type = 'directory'
      cb(err, result)
    }
  })
}

// 使用 async 模块调用异步函数并收集结果
function inspectAndDescribeFiles (folderPath, files, cb) {
  async.map(files, (file, asyncCb) => {
    let resolvedFilePath = path.resolve(folderPath, file)
    inspectAndDescribeFile(resolvedFilePath, asyncCb)
  }, cb)
}

module.exports = {
  getUsersHomeFolder,
  getFilesInFolder,
  inspectAndDescribeFiles
}
