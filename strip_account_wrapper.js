const fs = require('fs');
const path = require('path');
const dir = './src/pages/dashboard/account';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // replace <div className="..."> <AccountShell ... /> </div>
  const original = content;
  content = content.replace(/(return\s*\(\s*)<div[^>]*bg-\[#2C14DD\][^>]*>\s*(<AccountShell[\s\S]*?\/>)\s*<\/div>(\s*\);)/, '$1$2$3');
  
  if (content === original) {
      content = content.replace(/(return\s*\(\s*)<div[^>]*2C14DD[^>]*>\s*(<AccountShell[\s\S]*?\/>)\s*<\/div>(\s*\);)/, '$1$2$3');
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('Fixed ' + file);
  }
}
