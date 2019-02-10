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
         value TEXT NOT NULL,
         CHECK( value = 'high' OR value = 'medium' OR value = 'low' )
      )
    `);

    db.run(
      `CREATE UNIQUE INDEX IF NOT EXISTS order_priority ON orders( shipByDate, value )`
    );
  });
};
