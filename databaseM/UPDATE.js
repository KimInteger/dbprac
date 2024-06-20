const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database/product.db');

db.serialize(()=>{

  const stmt = db.prepare(`UPDATE product SET count =? WHERE name =?`);

  stmt.run(1,'드래곤볼');
  
  stmt.finalize();

});

db.close();