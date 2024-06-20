const http = require('node:http');

const fs = require('node:fs');

const qs = require('node:querystring');

const path = require('node:path');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req,res)=>{
  console.log('서버 포트에 연결');
});

server.listen(PORT,(err)=>{
  if(err){
    return new Error('에러가 발생하였습니다.', err);
  } else {
    console.log("server connected");
    console.log(`http://localhost:${PORT}`);
  }
});