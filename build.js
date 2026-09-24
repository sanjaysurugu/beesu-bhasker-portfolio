const fs = require('fs');
const path = require('path');

const root = __dirname;
const targets = ['dist', 'public'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

targets.forEach(dir => {
  const dirPath = path.join(root, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Copy index.html, assets, and ChatGPT_Image
  fs.copyFileSync(path.join(root, 'index.html'), path.join(dirPath, 'index.html'));
  fs.copyFileSync(path.join(root, 'ChatGPT_Image_Sep_24,_2026,_12_26_15_PM.png'), path.join(dirPath, 'ChatGPT_Image_Sep_24,_2026,_12_26_15_PM.png'));
  copyRecursiveSync(path.join(root, 'assets'), path.join(dirPath, 'assets'));
  
  console.log(`Copied site files to ${dir}/ successfully!`);
});
