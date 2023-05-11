const fs = require('fs');
const path = require('path');

const wayStyles = path.join(__dirname, 'styles');
const wayProject = path.join(__dirname, 'project-dist');
const wayBundleFile = path.join(wayProject, 'bundle.css');

fs.access(wayBundleFile, err => {
  if (err) {
    console.log('файла bundle.css НЕТ...');
    fs.writeFile(wayBundleFile, '', (err) => { if (err) throw err; });
    appendInStyleFile();
  } else {
    console.log('файл bundle.css ЕСТЬ');
    fs.truncate(wayBundleFile, err => {
      if (err) throw err;
      console.log('Файл bundle очищен');
      appendInStyleFile();
    });
  }
});

function appendInStyleFile() {
  fs.readdir(wayStyles, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (path.extname(file).includes('.css')) {
        console.log(`added ${file}`);
        fs.readFile(path.join(wayStyles, file), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(wayBundleFile, data, err => {
            if (err) throw err;
          });});
      }
    });
  });
}

