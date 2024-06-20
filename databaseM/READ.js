const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database/product.db');

db.all("SELECT * from product",(err,row)=>{
  if(err){
    return console.error(err.message);
  }
  console.log(row);
});

db.close();