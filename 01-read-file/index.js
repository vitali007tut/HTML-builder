const path = require('path')
const fs = require('fs');

const way = path.join(process.argv[1], 'text.txt')

const readableStream = fs.createReadStream(way, 'utf-8');
let data = '';
readableStream.on('data', chunk => { 
  data += chunk;
})

readableStream.on('end', () => console.log(data));
readableStream.on('error', error => console.log('Error', error.message));
