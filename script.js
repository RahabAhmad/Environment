const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Set the default file to serve
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html'; // Default to index.html if no file is specified
  }

  // Determine the content type based on file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html'; // Default content type

  if (extname == '.css') {
    contentType = 'text/css';
  } else if (extname == '.js') {
    contentType = 'application/javascript';
  }

  // Read the file and respond to the client
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
