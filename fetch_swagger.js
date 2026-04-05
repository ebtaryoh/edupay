const fs = require('fs');
const https = require('https');

https.get('https://edupaycore.sls.com.ng/swagger/v1/swagger.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('swagger.json', data);
    const swagger = JSON.parse(data);
    let markdown = '# EduPay API Endpoints\n\n';
    let summaryCount = 0;
    for (const path in swagger.paths) {
      for (const method in swagger.paths[path]) {
        const details = swagger.paths[path][method];
        markdown += `- **${method.toUpperCase()}** ${path}: ${details.summary || 'No summary'}\n`;
        summaryCount++;
      }
    }
    fs.writeFileSync('api_summary.md', markdown);
    console.log('API Summary created, total paths:', summaryCount);
  });
}).on('error', err => {
  console.error('Error fetching swagger:', err.message);
});
