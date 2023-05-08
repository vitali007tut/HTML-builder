const fs = require('fs');
const path = require('path');

const EventEmitter = require('events');
const emitter = new EventEmitter();

const pathComponents = path.join(__dirname, 'components');
const dirTarget = path.join(__dirname, 'project-dist');
const pathIndex = path.join(dirTarget, 'index.html');
const pathIndexTemp = path.join(dirTarget, 'indexTemp.html');

let template = '';

const handler1 = () => {
  fs.mkdir(dirTarget, { recursive: true }, err => {
    if (err) throw err;
    console.log('Папка была создана');
  })
};
  
const handler2 = () => {
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, dataTemp) => {
    if (err) throw err;
    fs.writeFile(pathIndex, dataTemp, err => {
      if (err) throw err;
      template = dataTemp;
      console.log('Файл index.html создан');

      fs.readdir(pathComponents, (err, files) => {
        if (err) throw err;
        // console.log(files)
        files.forEach(file => fs.readFile(path.join(pathComponents, file), 'utf-8', (err, fileData) => {
          if (err) throw err;
          const findString = `{{${path.parse(file).name}}}`
          // console.log(findString)
          // console.log('template', template)
          console.log(findString, 'чтение fileData')
          let replaceString = ''
          template = template.replace(findString, fileData)
          // console.log('template', template)
                      fs.writeFile(pathIndex, template, (err) => {
              if (err) throw err;
            })
          // fs.readFile(pathIndex, 'utf-8', (err, data) => {
          //   if (err) throw err;
          //   replaceString = data.replace(findString, fileData)
            // console.log('replaceString', replaceString)
            // fs.writeFile(pathIndex, replaceString, (err) => {
            //   if (err) throw err;
            // })
          // })
          
        }))
      })

    })
  })
}

const handler3 = () => {
  fs.readdir(pathComponents, (err, files) => {
    if (err) throw err;
    console.log(files)
    files.forEach(file => fs.readFile(path.join(pathComponents, file), 'utf-8', (err, fileData) => {
      if (err) throw err;
      // console.log(fileData)
      console.log('чтение fileData')

    }))
  })
}

// const handler4 = () => {
//   fs.rm(dirTarget, { recursive: true, force: true })
// }


emitter.on('start', handler1) // Папка была создана
emitter.on('start', handler2) // Файл index.html создан
// emitter.on('start', handler4)
// emitter.on('start', handler3)
// emitter.on('start', handler4)

emitter.emit('start'); 

// emitter.emit('index')

// const readableStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
// let template = '';
// readableStream.on('data', chunk => {
//   template += chunk;
// })
// readableStream.on('end', () => console.log(template));

// fs.mkdir(dirTarget, { recursive: true }, err => {
//   if (err) throw err;
//   console.log('Папка была создана');
// })

// fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, dataTemp) => {
//   if (err) throw err;
//   fs.writeFile(pathIndex, dataTemp, err => {
//     if (err) throw err;
//     console.log('Файл index.html создан');
//   })
// })


  // fs.readFile(pathIndex, 'utf-8', (err, dataIndex) => {
  //   if (err) throw err;
  //   dataIndex.replace(`{{${path.parse(file).name}}}`, fileData);
  // })




// fs.promises.readdir(pathComponents/* , { withFileTypes: true } */)
//   .then(files => {
    // console.log(files)
    // for (let file of files) {
      // console.log(path.parse(file))
      // читаею каждый файл компонентов
      // fs.readFile(path.join(pathComponents, file), 'utf-8', (err, fileData) => {
      //   if (err) throw err;
      // const readableStream = fs.createReadStream(path.join(pathComponents, file), 'utf-8');
      // let template = '';
      // readableStream.on('data', chunk => {template += chunk;})
      // readableStream.on('end', () => {
      //   const reader = fs.readFile(pathIndex, 'utf-8', (err, dataIndex) => {
      //     if (err) throw err;
      //     return dataIndex.replace(`{{${path.parse(file).name}}}`, template);
      //   })
        // replaceHtml = dataTemp.replace(`{{${path.parse(file).name}}}`, template)
  //     });
  //   }
    
  // })

  // from task 5
  const wayStyles = path.join(__dirname, 'styles');
  const wayProject = path.join(__dirname, 'project-dist');
  const wayBundleFile = path.join(wayProject, 'style.css')
  fs.access(wayBundleFile, error => {
    if (error) {
      fs.appendFile(wayBundleFile, '', err => {
        if (err) throw err;
      }
  )}
    fs.truncate(wayBundleFile, err => {
      if (err) throw err;
    })
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

// from task 4 + correct for copy directories
const wayCopy = path.join(__dirname, 'project-dist', 'assets');
const wayTarget = path.join(__dirname, 'assets');

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
    // readWriteFile()
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
  fs.readdir(directory, (err, elements) => {
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

function listObjects(path){
  fs.readdir(path, (err, files) => {
     if(err) throw err;

     for (let file of files){
        fs.stat('file.txt', (errStat, status) => {
           if(errStat) throw errStat;

           if(status.isDerictory()){
              console.log('Папка: ' + file);
              listObjects(path + '/' + file); // продолжаем рекурсию
           }else{
              console.log('Файл: ' + file);
           }
        });
     }
  });
  
}

function readDir(directory) {
  fs.mkdir(path.join(wayCopy, directory), err => {
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