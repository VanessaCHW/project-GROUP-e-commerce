import React, { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext(null);

const initialState = [];
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SEARCH_ARRAY': {
      return [...action.payload];
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [productsStatus, setProductsStatus] = useState('loading');

  const [companies, setCompanies] = useState(null);
  const [companiesStatus, setCompaniesStatus] = useState('loading');
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addSearchArray = (data) => {
    dispatch({
      type: 'ADD_SEARCH_ARRAY',
      payload: data,
    });
  };

  // Returns an array of ALL products
  useEffect(() => {
    setProductsStatus('loading');
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        // console.log('Fetch in ProductsContext.js: ', res);
        // console.log(Object.values(res.data));
        setProducts(Object.values(res.data));
        setProductsStatus('idle');
      })
      .catch((error) => {
        console.error('Error: unable to retrieve products', error);
        setProductsStatus('error');
      });
  }, []);

  //Returns all companies
  //Move to another Context????
  useEffect(() => {
    setCompaniesStatus('loading');
    fetch('/api/companies')
      .then((res) => res.json())
      .then((res) => {
        setCompanies(Object.values(res.data));
        //console.log(Object.values(res.data));
        setCompaniesStatus('idle');
      })
      .catch((error) => {
        console.error('Error: unable to retrieve companies', error);
        setCompaniesStatus('error');
      });
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsStatus,
        companies,
        companiesStatus,
        state,
        actions: {
          addSearchArray,
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
