const fs = require('fs');
const path = require('path');

const wayStyles = path.join(__dirname, 'styles');
const wayProject = path.join(__dirname, 'project-dist');
const wayBundleFile = path.join(wayProject, 'bundle.css')
fs.access(wayBundleFile, error => {
  if (error) {
    fs.appendFile(wayBundleFile, '', err => {
      if (err) throw err;
    }
)}
  //fs.truncate(wayBundleFile, err => {
  //  if (err) throw err;
  //})
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
