import React, { createContext, useEffect, useState } from 'react';

export const SearchContext = createContext(null);

const productSearchUrl = {
  all: '/api/products',
  category: '/api/category/',
  keyword: '/api/search/',
};

export const SearchProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchUrl, setSearchUrl] = useState(productSearchUrl.all);

  const searchAll = () => {
    setSearchUrl(productSearchUrl.all);
  };
  const searchByCategory = (category) => {
    setSearchUrl(`${productSearchUrl.category}${category}`);
  };
  const searchByKeyword = (keyword) => {
    setSearchUrl(`${productSearchUrl.keyword}${keyword}`);
  };
  useEffect(() => {
    //if (searchUrl !== productSearchUrl.all) {
    setSearchStatus('loading');
    fetch(searchUrl)
      .then((res) => res.json())
      .then((res) => {
        if (searchUrl === productSearchUrl.all) {
          setProducts(Object.values(res.data));
        } else {
          setProducts(res.data);
        }
        setSearchStatus('idle');
      })
      .catch((error) => {
        console.error('Error: unable to retrieve products', error);
        setSearchStatus('error');
      });
    // }
  }, [searchUrl]);

  return (
    <SearchContext.Provider
      value={{
        products,
        searchStatus,
        actions: {
          searchByCategory,
          searchByKeyword,
          searchAll,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
