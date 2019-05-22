'use strict'

const fileSystem = require('./script/fileSystem')
const userInterface = require('./script/userInterface')

// main
function main () {
  userInterface.bindDocument(window)
  let folderPath = fileSystem.getUsersHomeFolder()
  fileSystem.getFilesInFolder(folderPath, (err, files) => {
    if (err) {
      return alert('Sorry, we could not load your home folder')
    }
    fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles)
  })
}

main()
