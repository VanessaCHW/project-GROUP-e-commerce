const items = require('./data/items.json');
const companies = require('./data/companies.json');
const { v4: uuidv4 } = require('uuid');
const e = require('express');

// let SEARCHED = [];

// Returns all items from the inventory
const getProducts = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Request for all items fulfilled',
    data: { ...items },
  });
};

//Return all unique categories
const getAllUniqueCategories = (req, res) => {
  /////Get all unqiue categories
  // const newArr = [];
  // items.some((item) => {
  //   if (newArr.includes(item.category)) {
  //     return;
  //   } else {
  //     newArr.push(item.category);
  //   }
  // });
  // console.log(newArr, 'UNIQUE CATEGORY');

  /////Simpler way to get all unique categories
  const uniqueSet = new Set(items.map((item) => item.category));
  const uniqueArr = [...uniqueSet];
  // console.log(uniqueArr, 'UNIQUE CATEGORY');
  if (uniqueArr) {
    res.status(200).json({
      status: 200,
      message: `Request for all unique categories fulfilled`,
      data: uniqueArr,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: `${uniqueArr} not found`,
    });
  }
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

const getCategory = (req, res) => {
  //Get the category from the url ('/api/category/:category)
  const itemCategory = req.params.categoryId;
  // console.log(itemCategory.split('-').join('').toLowerCase());

  //Check if the category exist first, if not, send an error
  if (
    items.some((item) => {
      return (
        item.category.split(' ').join('').toLowerCase() ===
        itemCategory.split('-').join('').toLowerCase()
      );
    })
  ) {
    //Filter to get a new array of item from the asked category
    const itemInCategory = items.filter((item) => {
      return (
        item.category.split(' ').join('').toLowerCase() ===
        itemCategory.split('-').join('').toLowerCase()
      );
    });
    res.status(200).json({
      status: 200,
      message: `Request for items in ${itemCategory}`,
      data: itemInCategory,
    });
  } else {
    res.status(404).json({ status: 404, error: `${itemCategory} not found` });
  }
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
    res.status(404).json({ status: 404, error: `${itemCategory} not found` });
  }
};

//Returns companies data
const getCompanies = (req, res) => {
  res.status(200).json({
    status: 200,
    data: { ...companies },
    message: 'Request for companies fulfilled',
  });
};

//Add and get a new array of the searched items

const getProductSearch = (req, res) => {
  const keyword = req.params.keyword;
  console.log(keyword, 'TYPEHEAD');

  //Search for products with the typeheadValue
  const matchedSuggestions = items.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
  });
  if (matchedSuggestions) {
    res.status(200).json({
      status: 200,
      data: matchedSuggestions,
      message: 'Received data from typehead',
    });
  } else {
    res.status(404).json({
      status: 404,
      error: `No match for ${keyword}`,
    });
  }
};

module.exports = {
  getProducts,
  getAllUniqueCategories,
  getSomeProducts,
  getCategory,
  getProductInfo,
  getCompanies,
  getProductSearch,
};
