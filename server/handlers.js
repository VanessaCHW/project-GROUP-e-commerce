const items = require('./data/items.json');
const companies = require('./data/companies');
const e = require('express');

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

<<<<<<< HEAD
const getCategory = (req, res) => {
  //Get the category from the url ('/api/category/:category)
  const itemCategory = req.params.categoryId;

  //Check if the category exist first, if not, send an error
  if (
    items.some((item) => {
      return item.category.toLowerCase() === itemCategory.toLowerCase();
    })
  ) {
    //Filter to get a new array of item from the asked category
    const itemInCategory = items.filter((item) => {
      return item.category.toLowerCase() === itemCategory.toLowerCase();
    });
    res.status(200).json({
      status: 200,
      message: `Request for items in ${itemCategory}`,
      data: itemInCategory,
    });
  } else {
    res.status(404).json({ status: 404, error: `${itemCategory} not found` });
=======
//Returns data for a single product
const getProductInfo = (req, res) => {
  let item = items.find((item) => item._id == req.params.id);

  if (item) {
    res.status(200).json({
      status: 200,
      data: { ...item },
      message: 'Request for product data fulfilled',
    });
  } else {
>>>>>>> 124c134349d2bf45aaa8866797f8d695cd685880
  }
};

module.exports = {
  getProducts,
  getSomeProducts,
<<<<<<< HEAD
  getCategory,
=======
  getProductInfo,
>>>>>>> 124c134349d2bf45aaa8866797f8d695cd685880
};
