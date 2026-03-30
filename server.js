const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Users\\huyahui\\WorkBuddy\\20260315143056';
const PORT = 3000;
const MIME = {
  '.html': 'text/html;charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const fp = path.join(ROOT, urlPath);
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(fp);
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
