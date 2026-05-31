const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const srcPath = path.join(from, element);
    const destPath = path.join(to, element);
    const lStat = fs.lstatSync(srcPath);
    if (lStat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else if (lStat.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    }
  });
}

// Ensure .vercel/output directory is clean
if (fs.existsSync('.vercel')) {
  fs.rmSync('.vercel', { recursive: true, force: true });
}

// 1. Create .vercel/output structure
fs.mkdirSync('.vercel/output/static', { recursive: true });
fs.mkdirSync('.vercel/output/functions/__server.func', { recursive: true });

// 2. Copy config.json
if (fs.existsSync('dist/config.json')) {
  fs.copyFileSync('dist/config.json', '.vercel/output/config.json');
}

// 3. Copy client assets to static folder
if (fs.existsSync('dist/client')) {
  copyFolderSync('dist/client', '.vercel/output/static');
}

// 4. Copy server assets to functions/__server.func folder
if (fs.existsSync('dist/server')) {
  copyFolderSync('dist/server', '.vercel/output/functions/__server.func');
}

console.log('Successfully prepared .vercel/output for Vercel Serverless deployment!');
