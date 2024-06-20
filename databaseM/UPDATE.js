const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결
const db = new sqlite3.Database('../database/product.db');

// 데이터베이스 작업을 직렬화하여 실행
db.serialize(() => {
  // SQL 문 준비
  const stmt = db.prepare(`UPDATE product SET count = ? WHERE name = ?`);

  // 준비된 문을 실행
  stmt.run(0, '드래곤볼', function(err) {
    if (err) {
      return console.error('에러 발생', err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });

  // 문을 종료
  stmt.finalize();

  // 데이터베이스 연결 종료
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});