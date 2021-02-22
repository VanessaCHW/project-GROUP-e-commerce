const sort_LowToHigh = (array) => {
  let data = [...array];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1; j++) {
      if (
        parseFloat(data[j].price.slice(1).replace(',', '')) >
        parseFloat(data[j + 1].price.slice(1).replace(',', ''))
      ) {
        let temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }
  return data;
};

const sort_HighToLow = (array) => {
  let data = [...array];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1; j++) {
      if (
        parseFloat(data[j].price.slice(1).replace(',', '')) <
        parseFloat(data[j + 1].price.slice(1).replace(',', ''))
      ) {
        let temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }
  return data;
};

/**SORT BY: Featured (default sorting is by ID) */
const sort_byId = (array) => {
  let data = [...array];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1; j++) {
      if (parseInt(data[j]._id) > parseInt(data[j + 1]._id)) {
        let temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }
  return data;
};

module.exports = {
  sort_LowToHigh,
  sort_HighToLow,
  sort_byId,
};
