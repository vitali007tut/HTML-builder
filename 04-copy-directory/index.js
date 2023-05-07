const fs = require('fs');
const path = require('path');

const wayCopy = path.join(__dirname, 'files-copy');
const wayTarget = path.join(__dirname, 'files');

function makeDir() {
  fs.mkdir(wayCopy, { recursive: true }, err => {
    if (err) throw err;
    // console.log('Папка "files-copy" была создана');
    readWriteFile()
  });
}
function reCreateDir() {
  fs.rm(wayCopy, { recursive: true }, err => {
    if (err) throw err;
    // console.log('Папка "files-copy" была delete');
    makeDir()
    readWriteFile()
  });
}
function readWriteFile() {
  fs.readdir(wayTarget, (err, files) => {
    if(err) throw err;
    files.forEach(e => {
      // читаю файл
      fs.readFile(path.join(wayTarget, e), 'utf-8', (err, dataR) => {
        if (err) throw err;
        // создаю и заполняю файл
        fs.writeFile(path.join(wayCopy, e), dataR, (err) => {
          if (err) throw err;
      })
    })
    })
  });
}

fs.access(wayCopy, error => {
  if (error) { makeDir() }
  else { reCreateDir() }
});

