import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductsContext } from './ProductsContext';

const FilterBox = ({
  filteredItems,
  setFilteredItems,
  originalArray,
  setCurrentPage,
}) => {
  const [compFilters, setCompFilters] = useState([]); //Stores the filters for companies
  const [priceFilters, setPriceFilters] = useState([]); //Stores filters for price range
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
    companies.forEach((company) => {
      if (ids.includes(company._id)) {
        temp.push({ id: company._id, name: company.name });
      }
    });

    return temp;
  };

  let companyData = getCompanyData(); //For showing all companies in box

  // Update the companies filters lists
  // when a company is checked/unchecked
  const handleCompanyInput = (id) => {
    //Add or remove filter criteria
    if (document.getElementById(id).checked === false) {
      let temp = [...compFilters];
      temp.splice(temp.indexOf(id), 1);
      setCompFilters(temp);
    } else {
      setCompFilters([...compFilters, id]);
    }
  };

  const handlePriceInput = (range) => {
    console.log(range);
  };

  //Update the item list when any filters states are changed
  useEffect(() => {
    if (compFilters.length === 0) {
      setFilteredItems(originalArray);
    } else if (compFilters.length > 0) {
      let temp = [];
      compFilters.map((criteria) => {
        let resultForCriteria = originalArray.filter(
          (item) => item.companyId === parseInt(criteria)
        );
        temp = [...temp, ...resultForCriteria];
      });
      setFilteredItems(temp);
    }
    setCurrentPage(0);
  }, [compFilters]);

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
                    key={company.id}
                    type="checkbox"
                    id={company.id}
                    value={company.id}
                    onChange={(ev) => handleCompanyInput(ev.target.value)}
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
                    onChange={(ev) => handlePriceInput(ev.target.value)}
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
          <input type="checkbox" id="instock" name="instock" value="instock" />
          <label>In stock</label>
          <br />
          <input type="checkbox" id="nostock" name="nostock" value="nostock" />
          <label>Out of stock</label>
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
