const {
  getTodaysOrders,
  getFutureOrders,
  getOverdueOrders,
} = require('../utils');

module.exports = async (req, res) => {
  try {
    const limit = req.body.num;
    // HT: https://stackoverflow.com/a/19079030/768757, avoiding adding moment or the like (for now)
    const today = new Date().toJSON().slice(0, 10);
    const [overdue, todays, future] = await Promise.all([
      getOverdueOrders(today, limit),
      getTodaysOrders(today, limit),
      getFutureOrders(today, limit),
    ]);

    let retrieved = [];

    // Pull from Overdue orders first
    retrieved = overdue.slice(0, limit);

    // Then Todays
    if (retrieved.length < limit) {
      retrieved = retrieved.concat(todays.slice(0, limit - retrieved.length));
    }

    // Finally Future
    if (retrieved.length < limit) {
      retrieved = retrieved.concat(future.slice(0, limit - retrieved.length));
    }

    // Mark orders as fulfilled

    // "Must provide prioritization order"
  } catch (err) {
    console.error(err);
  }
};
