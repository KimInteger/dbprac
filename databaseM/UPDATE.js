function update(count,name){
  const sqlite3 = require('sqlite3').verbose();
  
  const db = new sqlite3.Database('./database/product.db');
  
  db.serialize(()=>{
  
    const stmt = db.prepare(`UPDATE product SET count =? WHERE name =?`);
  
    stmt.run(parseInt(count,10),name);
    
    stmt.finalize();
  
  });
  
  db.close();
  
}

module.exports = update;