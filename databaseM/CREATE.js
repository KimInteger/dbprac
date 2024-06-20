const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database/product.db');

db.serialize((err)=>{
  if(err){
    return new Error("에러가 발생", err.message);
  }
  db.run('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY, name TEXT NOT NULL, count INTEGER NOT NULL, price INTEGER NOT NULL)',(err)=>{
    if (err){
      return new Error(err.message);
    }
  });

  const stmt = db.prepare(`INSERT INTO product (name, count, price) VALUES (?, ?, ?)`);

  stmt.run('천부인', 1, 10000000);
  
  stmt.finalize();
});

db.close();