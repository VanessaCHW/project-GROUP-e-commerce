const items = require('./data/items.json');
const companies = require('./data/companies');

// Returns all items from the inventory
const getProducts = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Request for all items fulfilled',
    data: { ...items },
  });
};

//Returns the first 8 items from the inventory
const getSomeProducts = (req, res) => {
  let someItems = items.slice(0, 8);
  res.status(200).json({
    status: 200,
    message: 'Request for all items fulfilled',
    data: someItems,
  });
};

module.exports = {
  getProducts,
  getSomeProducts,
};
