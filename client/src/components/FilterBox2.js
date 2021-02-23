import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductsContext } from './ProductsContext';
import { SearchContext } from './SearchContext';

const FilterBox2 = ({ filteredItems, setFilteredItems, setCurrentPage }) => {
  const { companies } = useContext(ProductsContext);
  const { products } = useContext(SearchContext);
  const allIds = products.map((item) => item._id);
  const initialFilters = {
    allIds: allIds,
    sorting: 'featured',
    brandId: [],
    price: { start: null, end: null },
    stock: null,
  };
  const [filters, setFilters] = useState(initialFilters);

  // Produce list of company ids
  const getAllCompanyId = () => {
    let temp = [];
    products.forEach((item) => {
      if (!temp.includes(item.companyId)) {
        temp.push(item.companyId);
      }
    });
    return temp;
  };

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

  const handleSort = (value) => {
    setFilters({ ...filters, sorting: value });
    return;
  };

  const handleBrands = (id) => {
    //If element is checked, add to filters
    if (document.getElementById(id).checked) {
      setFilters({ ...filters, brandId: [...filters.brandId, id] });
    } else {
      let temp = [...filters.brandId];
      temp.splice(temp.indexOf(id), 1);
      setFilters({ ...filters, brandId: temp });
    }
  };

  const handleStock = (id) => {
    if (
      document.getElementById('instock').checked === true &&
      document.getElementById('nostock').checked === false
    ) {
      setFilters({ ...filters, stock: 'instock' });
    } else if (
      document.getElementById('instock').checked === false &&
      document.getElementById('nostock').checked === true
    ) {
      setFilters({ ...filters, stock: 'nostock' });
    }
    if (
      document.getElementById('instock').checked ===
      document.getElementById('nostock').checked
    ) {
      setFilters({ ...filters, stock: null });
    }
  };

  useEffect(() => {
    if (filters != initialFilters) {
      fetch('/api/filter', {
        method: 'POST',
        body: JSON.stringify(filters),
        headers: { 'Content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((res) => {
          setFilteredItems(res.data);
        });
    }
  }, [filters]);
  if (filteredItems) {
    return (
      <Wrapper>
        <form>
          <SortByPrice
            id="sortBy"
            onChange={(ev) => handleSort(ev.target.value)}
          >
            <option value="featured">Sort by: Featured </option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
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
                      onChange={(ev) => handleBrands(ev.target.value)}
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
            <Price>
              <PriceBox
                placeholder="$Min"
                id="min"
                value={filters.price.start}
                onChange={(ev) =>
                  setFilters({
                    ...filters,
                    price: { ...filters.price, start: ev.target.value },
                  })
                }
              />
              <PriceBox
                placeholder="$Max"
                id="max"
                onChange={(ev) =>
                  setFilters({
                    ...filters,
                    price: { ...filters.price, end: ev.target.value },
                  })
                }
              />
            </Price>
          </div>
          <div className="stockSection">
            <div className="sectionTitle">Availability</div>
            <label>
              <input
                type="checkbox"
                id="instock"
                name="instock"
                value="instock"
                onChange={(ev) => handleStock('instock')}
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
                onChange={(ev) => handleStock('nostock')}
              />
              Out of stock
            </label>
            <br />
          </div>
        </form>
      </Wrapper>
    );
  } else {
    return <Wrapper>Loading</Wrapper>;
  }
};
const Wrapper = styled.div`
  min-width: 230px;
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
const Price = styled.div`
  display: flex;
  flex-direction: row;
`;
const PriceBox = styled.textarea`
  resize: none;
  height: 2rem;
  width: 60px;
  margin-right: 5px;
  white-space: normal;

  text-align: justify;
  text-align-last: center;
  overflow: hidden;
  font-size: 1rem;
`;

export default FilterBox2;
