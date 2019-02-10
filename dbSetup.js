// Handle basic setup. For simplicity, this will run on start up everytime.
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./orders.db');

module.exports = () => {
  db.serialize(() => {
    // db.run(`DROP TABLE IF EXISTS orders`);

    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        shipByDate TEXT NOT NULL,
        value INTEGER NOT NULL,
        fulfilled INTEGER DEFAULT 0,
        CHECK( value = 2 OR value = 1 OR value = 0 ),
        CHECK( fulfilled = 1 OR fulfilled = 0 )
      )
    `);

    db.run(
      `CREATE INDEX IF NOT EXISTS order_priority ON orders( shipByDate, value )`
    );
  });
};
