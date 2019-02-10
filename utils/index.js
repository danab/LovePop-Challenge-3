const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./orders.db');

const getOrders = query => {
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
    ORDER BY shipByDate ASC, value DESC
    LIMIT ${limit}
  `;
};

const getOverdueOrders = (date, limit) => {
  const query = createQuery(date, '<', limit);
  return getOrders(query);
};

const getTodaysOrders = (date, limit) => {
  const query = createQuery(date, '=', limit);
  return getOrders(query);
};

const getFutureOrders = (date, limit) => {
  // Future Orders are ordered by value only
  const query = `
    SELECT *
    FROM orders
    WHERE shipByDate > "${date}"
    ORDER BY value DESC
    LIMIT ${limit}
  `;
  return getOrders(query);
};

module.exports = {
  getOverdueOrders,
  getTodaysOrders,
  getFutureOrders,
};
