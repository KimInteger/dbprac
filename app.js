const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const PORT = process.env.PORT || 8080;
const update = require('./databaseM/UPDATE.js');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        }
      });
    } else if (req.url === '/script.js') {
      fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(content);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else if (req.method === 'POST' && req.url === '/update') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedData = JSON.parse(body);
      const { count, product } = parsedData;
      console.log(count);
      console.log(product);

      const sqlite3 = require('sqlite3').verbose();

      const db = new sqlite3.Database('./database/product.db');
      
      db.serialize(()=>{
        update(count,product);

        db.get(`SELECT name, count from product WHERE name = ?`,[product],(err,rows)=>{
          if (err) {
            return new Error(err.message);
          } else {
            console.log(rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
          }
        })
      });
      db.close();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.error('에러가 발생하였습니다.', err);
  } else {
    console.log('Server connected');
    console.log(`http://localhost:${PORT}`);
  }
});