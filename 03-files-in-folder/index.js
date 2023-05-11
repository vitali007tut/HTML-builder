const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'secret-folder')

fs.promises.readdir(way, { withFileTypes: true })
    .then(items => {
        for (let dirent of items) {
          if (dirent.isFile()) {
            const element = path.parse(dirent.name)
            const wayToElement = path.join(way, element.base)
            fs.stat(wayToElement, (err, stats) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log(`${element.name} - ${element.ext.slice(1)} - ${stats.size / 1000}kb`);
              }
            })
          }
        }
    })
