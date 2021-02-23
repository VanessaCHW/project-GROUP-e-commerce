const items = require('./data/items.json');
const companies = require('./data/companies.json');
const { v4: uuidv4 } = require('uuid');
const e = require('express');
const {
  sort_LowToHigh,
  sort_HighToLow,
  sort_byId,
} = require('./filterFunctions');

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

const getFilterResults = (req, res) => {
  // Re-create the filtered items
  // (from Categories or Search bar)
  // With the list of all ids
  let array = items.filter((item) => req.body.allIds.includes(item._id));

  //Apply filters
  let result = [];
  result = array
    .filter((item) => {
      if (req.body.brandId.length > 0) {
        return req.body.brandId.includes(item.companyId.toString());
      } else {
        return item;
      }
    })
    .filter((item) => {
      if (req.body.price.start) {
        return (
          parseFloat(item.price.slice(1).replace(',', '')) >=
          req.body.price.start
        );
      } else {
        return item;
      }
    })
    .filter((item) => {
      if (req.body.price.end) {
        return (
          parseFloat(item.price.slice(1).replace(',', '')) < req.body.price.end
        );
      } else {
        return item;
      }
    })
    .filter((item) => {
      if (req.body.stock === 'instock') {
        return item.numInStock > 0;
      } else if (req.body.stock === 'nostock') {
        return item.numInStock === 0;
      } else {
        return item;
      }
    });

  // Sort the final array of items
  if (req.body.sorting === 'featured') {
    result = sort_byId(result);
  } else if (req.body.sorting === 'lowToHigh') {
    result = sort_LowToHigh(result);
  } else if (req.body.sorting === 'highToLow') {
    result = sort_HighToLow(result);
  }

  res.status(200).json({
    status: 200,
    data: result,
    message: 'Filter results',
  });
};

const handlePurchase = (req, res) => {
  let confirmeditems = [];
  let rejecteditems = [];
  let requestedItems = req.body.items;
  let form = req.body.form;
  let formError = false;

  //Compare numinStock with qty requested
  requestedItems.map((item) => {
    let stockItem = items.filter((product) => product._id === item.id);
    if (stockItem[0].numInStock >= item.qty && item.qty > 0) {
      confirmeditems.push(item);
    } else {
      rejecteditems.push({
        name: stockItem[0].name,
        stock: stockItem[0].numInStock,
        requested: item.qty,
      });
    }
  });

  if (rejecteditems.length === 0 && formError === false) {
    requestedItems.map((item) => {
      let index = items.findIndex((product) => product._id === item.id);
      items[index].numInStock = items[index].numInStock - item.qty;
    });
  }

  if (Object.values(form).length != 10) {
    formError = true;
  }

  if (formError) {
    res.status(404).json({
      status: 404,
      error: 'form',
      data: form,
    });
  } else if (rejecteditems.length > 0) {
    res.status(404).json({
      status: 404,
      error: 'stock',
      data: rejecteditems,
    });
  } else {
    let randomID = { id: uuidv4() };
    delete form.expiration;
    delete form.credit;
    delete form.cvv;
    let confirmation = { ...randomID, items: confirmeditems, form: form };

    res.status(200).json({
      status: 200,
      data: confirmation,
      message: 'Transaction processed',
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
  getFilterResults,
  getProductSearch,
  handlePurchase,
};
