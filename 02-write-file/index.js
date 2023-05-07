const fs = require('fs');
const path = require('path');

console.log(path.join(__dirname, 'text.txt'))

// fs.appendFile(
//     path.join(__dirname, 'notes', 'mynotes.txt'),
//     ' From append file',
//     err => {
//         if (err) throw err;
//         console.log('Файл был изменен');
//     }
// );

// fs.appendFile(path.join(__dirname, 'text.txt'), 'text', (error) => {
//   if (error) return console.error(error.message);
//   console.log('Файл создан');
// });

const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
// stdin.pipe(output)

stdout.write('Введи текст, который запишется в файл\n');

stdin.on('data', data => {
  // stdout.write('Привет, ');
  // stdin.pipe(data)
  
  if (data.includes('exit')) {
    process.exit();
  } else {
    output.write(data)
  }
});

process.on('SIGINT', () => {process.exit();});
process.on('exit', () => stdout.write('Удачи - Good Luck!'));