// gzip_file.js
// This script compresses a given file using gzip

const { createGzip } = require('zlib');
const { createReadStream, createWriteStream, existsSync , mkdirSync, renameSync} = require('fs');
const path = require('path');

/*
  node gzip_file <filePath>
  It will compress the specified file into a .gz version.
*/

let filePath = process.argv[2]; // relative or absolute

if (!filePath) {
  console.error('gZip', 'No file path provided.');
  process.exit(1);
}

const fullPath = path.resolve(filePath);
console.log('gZip', 'inProgress');

if (!existsSync(fullPath)) {
  console.error('gZip', `File does not exist: ${fullPath}`);
  process.exit(1);
}


// Determine extensions and output file name
const ext = path.extname(fullPath);
const dir = path.dirname(fullPath);
const base = path.basename(fullPath, ext);
const outputFile = path.join(dir,  `${base}-comp.gz`);
//const gzFileLocal = path.join(dir, `${base}.gz`);

console.log('gZip', `${fullPath}`);

const gzip = createGzip();
const source = createReadStream(fullPath);
const destination = createWriteStream(outputFile);


source
  .pipe(gzip)
  .pipe(destination)
  .on('finish', () => {
    // const outputDir = path.resolve("output");
    // mkdirSync(outputDir, { recursive: true });

    // const gzInOutput = path.join(outputDir, `${base}.gz`);
    // renameSync(gzFileLocal, gzInOutput);

    // console.log('gZip', `Moved → ${gzInOutput}`);

    // 3️⃣ Rename file.gz → file.js (same name as original)
    const finalFile = path.join(dir, `${base}-comp${ext}`);
    renameSync(outputFile, finalFile);

    console.log('gZip', `${outputFile}`);
    

  })
  .on('error', (err) => {
    console.error('gZip', `Error compressing file: ${err.message}`);
  });
