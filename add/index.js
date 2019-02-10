const { insertOrders } = require('../utils');

module.exports = async (req, res) => {
  try {
    const { orders } = req.body;
    await Promise.all(insertOrders(orders));
    res.json({ success: true, updated: orders.length });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
