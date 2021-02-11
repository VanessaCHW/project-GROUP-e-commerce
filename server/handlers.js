const items = require('./data/items.json');
const companies = require('./data/companies.json');
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
  }
};

//Return data companies
// const getInfoCompanies = (req, res) => {
//   let company = companies.find((company) => company._id == req.params.id);

//   if (company) {
//     res.status(200).json({
//       status: 200,
//       data: { ...company },
//       message: 'Request for product data fulfilled',
//     });
//   } else {
//   }
// };

module.exports = {
  getProducts,
  getSomeProducts,
  getProductInfo,
  // getInfoCompanies,
};
