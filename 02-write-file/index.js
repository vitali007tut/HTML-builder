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
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введи текст, который запишется в файл\n');

stdin.on('data', data => {

  if (data.includes('exit')) {
    process.exit(); // выход по содержанию "exit"
  } else {
    output.write(data)
  }
});

process.on('SIGINT', () => {process.exit();}); // выход по ctrl+c
process.on('exit', () => stdout.write('Удачи - Good Luck!'));