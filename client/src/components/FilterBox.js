import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductsContext } from './ProductsContext';

const FilterBox = ({
  filteredItems,
  setFilteredItems,
  originalArray,
  setCurrentPage,
}) => {
  /**TO DO: combine all states in a single one */
  /**TO DO: sort items after filtering */
  /**TO DO: correct bug when all options are checked */
  const [compFilters, setCompFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [stockFilter, setStockFilter] = useState(null);
  const { companies } = useContext(ProductsContext);
  const priceRanges = [
    { text: 'Under $25', value: 'under25' },
    { text: '$25 to $50', value: '25to50' },
    { text: '$50 to $100', value: '50to100' },
    { text: '$100 to $200', value: '100to200' },
    { text: '$200 and above', value: '200nup' },
  ];
  /**SORT BY: price: low to high */
  const sort_LowToHigh = () => {
    let data = [...filteredItems];
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
    setFilteredItems(data);
  };

  /**SORT BY: price: high to low */
  const sort_HighToLow = () => {
    let data = [...filteredItems];
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
    setFilteredItems(data);
  };

  /**SORT BY: Featured (default sorting is by ID) */
  const sort_byId = () => {
    let data = [...filteredItems];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - 1; j++) {
        if (parseInt(data[j]._id) > parseInt(data[j + 1]._id)) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
    setFilteredItems(data);
  };

  const handleSort = (sort) => {
    switch (sort) {
      case 'sort_by_lowToHigh':
        sort_LowToHigh();
        return;
      case 'sort_by_highToLow':
        sort_HighToLow();
        return;
      case 'sort_by_featured':
      default:
        sort_byId();
        return;
    }
  };

  //************************************ */
  // Produce list of company ids
  const getAllCompanyId = () => {
    let temp = [];
    originalArray.forEach((item) => {
      if (!temp.includes(item.companyId)) {
        temp.push(item.companyId);
      }
    });
    return temp;
  };
  //************************************ */
  // Produce list of objects with company name+ids
  const getCompanyData = () => {
    let ids = getAllCompanyId();
    let temp = [];
    //Create objects of company name/id
    if (companies) {
      companies.forEach((company) => {
        if (ids.includes(company._id)) {
          temp.push({ id: company._id, name: company.name });
        }
      });
    }
    return temp;
  };

  //For showing all companies in box
  let companyData = getCompanyData();

  // Add/removes filters to the corresponding state
  // gets called every time a filter is checked/unchecked
  const handleInput = (id, state, setState) => {
    if (document.getElementById(id).checked) {
      setState([...state, id]);
      // console.log(state);
    } else {
      let temp = [...state];
      temp.splice(temp.indexOf(id), 1);
      setState(temp);
    }
  };

  //Finding corresponding items
  const filterByBrand = () => {
    if (compFilters.length === 0) {
      setFilteredItems(originalArray);
    } else {
      let temp = [];
      if (compFilters.length > 0) {
        compFilters.map((criteria) => {
          let resultForCriteria = originalArray.filter(
            (item) => item.companyId === parseInt(criteria)
          );
          temp = [...temp, ...resultForCriteria];
        });
        setFilteredItems(temp);
      }
    }
    return filteredItems;
  };

  //Finding corresponding items
  const filterByPrice = (data) => {
    //Helper function
    const getItemsByRange = (data, start, end) => {
      let temp = data.filter(
        (item) =>
          item.price.slice(1).replace(',', '') > start &&
          item.price.slice(1).replace(',', '') < end
      );
      return temp;
    };

    if (priceFilters.length > 0) {
      let temp = [];
      priceFilters.map((range) => {
        switch (range) {
          case 'under25':
            temp = [...temp, ...getItemsByRange(data, 0, 25)];
            break;
          case '25to50':
            temp = [...temp, ...getItemsByRange(data, 25, 50)];
            break;
          case '50to100':
            temp = [...temp, ...getItemsByRange(data, 50, 100)];
            break;
          case '100to200':
            temp = [...temp, ...getItemsByRange(data, 100, 200)];
            break;
          case '200nup':
            temp = [...temp, ...getItemsByRange(data, 200, 10000)];
          default:
            break;
        }
      });
      setFilteredItems(temp);
    }
    return filteredItems;
  };

  const filterByStock = (data) => {
    // console.log('yo');
    // console.log(stockFilter);
    if (stockFilter === 'nostock') {
      setFilteredItems([...data.filter((item) => item.numInStock === 0)]);
      return filteredItems;
    } else if (stockFilter === 'instock') {
      setFilteredItems([...data.filter((item) => item.numInStock > 0)]);
      return filteredItems;
    } else {
      return data;
    }
  };

  //Update the item list when any filters states are changed
  useEffect(() => {
    filterByStock(filterByPrice(filterByBrand()));
    setCurrentPage(0);
  }, [compFilters, priceFilters, stockFilter]);

  return (
    <Wrapper>
      <form>
        <SortByPrice id="sortBy" onChange={(ev) => handleSort(ev.target.value)}>
          <option value="sort_by_featured">Sort by: Featured </option>
          <option value="sort_by_lowToHigh">Price: Low to High</option>
          <option value="sort_by_highToLow">Price: High to Low</option>
        </SortByPrice>
        <div className="brandSection">
          <div className="sectionTitle">Brand</div>
          {companyData.map((company) => {
            return (
              <>
                <label>
                  <input
                    type="checkbox"
                    id={company.id}
                    value={company.id}
                    onChange={(ev) =>
                      handleInput(ev.target.value, compFilters, setCompFilters)
                    }
                  />
                  {company.name}
                </label>
                <br />
              </>
            );
          })}
        </div>
        <div className="priceSection">
          <div className="sectionTitle">Price</div>
          {priceRanges.map((priceRange) => {
            return (
              <>
                <label>
                  <input
                    type="checkbox"
                    id={priceRange.value}
                    value={priceRange.value}
                    onChange={(ev) =>
                      handleInput(
                        ev.target.value,
                        priceFilters,
                        setPriceFilters
                      )
                    }
                  />
                  {priceRange.text}
                </label>
                <br />
              </>
            );
          })}
        </div>
        <div className="stockSection">
          <div className="sectionTitle">Availability</div>
          <label>
            <input
              type="checkbox"
              id="instock"
              name="instock"
              value="instock"
              onChange={(ev) => {
                ev.target.checked
                  ? setStockFilter('instock')
                  : setStockFilter(null);
              }}
            />
            In stock
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="nostock"
              name="nostock"
              value="nostock"
              onChange={(ev) => {
                ev.target.checked
                  ? setStockFilter('nostock')
                  : setStockFilter(null);
              }}
            />
            Out of stock
          </label>
          <br />
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 265px;
  box-sizing: content-box;
  border-right: 2px solid #dddddd;
  margin: 0 15px;
  padding: 30px 40px 0px 20px;
  .brandSection,
  .priceSection,
  .stockSection {
    padding-top: 15px;
  }
  .sectionTitle {
    font-weight: 500;
  }
`;
const SortByPrice = styled.select`
  font-size: 1rem;
`;

export default FilterBox;
