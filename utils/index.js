const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./orders.db');

const runQuery = query => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Since we aren't using any user inputs here, I'd argue this is ugly, but not a terrible way of handling
const createQuery = (date, comparator, limit) => {
  return `
    SELECT *
    FROM orders
    WHERE shipByDate ${comparator} "${date}"
    AND fulfilled = 0
    ORDER BY shipByDate ASC, value DESC
    LIMIT ${limit}
  `;
};

const getOverdueOrders = (date, limit) => {
  const query = createQuery(date, '<', limit);
  return runQuery(query);
};

const getTodaysOrders = (date, limit) => {
  const query = createQuery(date, '=', limit);
  return runQuery(query);
};

const getFutureOrders = (date, limit) => {
  // Future Orders are ordered by value only
  const query = `
    SELECT *
    FROM orders
    WHERE shipByDate > "${date}"
    AND fulfilled = 0
    ORDER BY value DESC
    LIMIT ${limit}
  `;
  return runQuery(query);
};

const markOrdersFulfilled = orders => {
  const ids = orders.map(order => order.id);
  const query = `
    UPDATE orders
    SET fulfilled = 1
    WHERE id IN (${ids.join(', ')})
  `;
  return runQuery(query);
};

const insertOrders = orders => {
  return orders.map(order => {
    const value = order.value === 'high' ? 2 : order.value === 'medium' ? 1 : 0;
    const query = `
    INSERT INTO orders (id, shipByDate, value)
    VALUES (${order.id}, ${order.shipByDate}, ${value})
    `;
    return runQuery(query);
  });
};

// Dummy data generator
// eslint-disable-next-line
const addSomeOrders = () => {
  db.serialize(() => {
    for (var i = 0; i < 50; i++) {
      db.run(`
        INSERT INTO orders (id, shipByDate, value)
        VALUES ( ${Math.floor(Math.random() * 100000)}, '2019-0${Math.ceil(
        Math.random() * 4
      )}-10', ${Math.floor(Math.random() * 3)})
    `);
    }
  });
};

module.exports = {
  getOverdueOrders,
  getTodaysOrders,
  getFutureOrders,
  insertOrders,
  markOrdersFulfilled,
};
