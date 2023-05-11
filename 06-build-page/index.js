const fs = require('fs');
const path = require('path');
const { readdir, mkdir } = require('fs/promises');

const pathComponents = path.join(__dirname, 'components');
const dirTarget = path.join(__dirname, 'project-dist');
const pathIndex = path.join(dirTarget, 'index.html');

let template = '';

// new use readdir and mkdir
fs.rm(dirTarget, { recursive: true, force: true }, () => {
  mkdir(dirTarget, { recursive: true }).then(() => {
    makeHtml()
    makeStyle()
    makeCopyDir()
  })
})

function makeHtml() {
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, dataTemp) => {
      if (err) throw err;
      fs.writeFile(pathIndex, dataTemp, err => {
        if (err) throw err;
        template = dataTemp;
        console.log('Файл index.html создан');
  
        fs.readdir(pathComponents, (err, files) => {
          if (err) throw err;
          files.forEach(file => fs.readFile(path.join(pathComponents, file), 'utf-8', (err, fileData) => {
            if (err) throw err;
            const findString = `{{${path.parse(file).name}}}`
            console.log(findString, 'чтение fileData')
            template = template.replace(findString, fileData)
                        fs.writeFile(pathIndex, template, (err) => {
                if (err) throw err;
              })
          }))
        })
  
      })
    })
}

  // from task 5
function makeStyle() {
  const wayStyles = path.join(__dirname, 'styles');
  const wayProject = path.join(__dirname, 'project-dist');
  const wayBundleFile = path.join(wayProject, 'style.css')
  fs.access(wayBundleFile, error => {
    if (error) {
      fs.appendFile(wayBundleFile, '', err => {
        if (err) throw err;
      }
  )}
    // fs.truncate(wayBundleFile, err => {
    //   if (err) throw err;
    // })
  })
  fs.readdir(wayStyles, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (path.extname(file).includes('.css')) {
        // console.log(file)
        const input = fs.readFile(path.join(wayStyles, file), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(wayBundleFile, data, err => {
            if (err) throw err;
          })})
      }
    })
  })
}



// from task 4 + correct for copy directories
function makeCopyDir() {
  const wayCopy = path.join(__dirname, 'project-dist', 'assets');
  const wayTarget = path.join(__dirname, 'assets');
  
  function makeDir() {
    fs.mkdir(wayCopy, { recursive: true }, err => {
      if (err) throw err;
      // console.log('Папка "files-copy" была создана');
      readWriteFile()
    });
  }
  
  function readWriteFile() {
    fs.readdir(wayTarget, (err, files) => {
      if(err) throw err;
      files.forEach(e => {
      readDir(e)
      })
    });
  }
  
  fs.access(wayCopy, error => {
    if (error) { makeDir() }
    else {
      removeDir(wayCopy);
      makeDir()
    }
  });
  
  function removeDir(directory) {
    readdir(directory, (err, elements) => {
      if (err) throw err;
      console.log(elements)
      for (let element of elements) {
        fs.stat(path.join(directory, element), (err, stats) => {
          if (err) throw err;
          if (stats.isDirectory()) {
            removeDir(path.join(directory, element))
          } else {
            console.log('element', element)
            fs.unlink(path.join(directory, element), err => {
              if (err) throw err;
            })
          }
        })
  
      }
    })
  }
  
  function readDir(directory) {
    mkdir(path.join(wayCopy, directory), err => {
      if (err) throw err;
    })
    fs.readdir(path.join(wayTarget, directory), (err, files) => {
      if (err) throw err;
      files.forEach(e => {
        // читаю файл
        console.log('копирование файла', e)
        fs.readFile(path.join(wayTarget, directory, e), (err, dataR) => {
          if (err) throw err;
          // создаю и заполняю файл
          fs.writeFile(path.join(wayCopy, directory, e), dataR, (err) => {
            if (err) throw err;
        })
      })
      })
    })
  }
}