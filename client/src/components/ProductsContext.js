import React, { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [status, setStatus] = useState('loading');

  // Returns an array of ALL products
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        // console.log('Fetch in ProductsContext.js: ', res);
        // console.log(Object.values(res.data));
        setProducts(Object.values(res.data));
      })
      .catch((error) => {
        console.error('Error: unable to retrieve products', error);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, status }}>
      {children}
    </ProductsContext.Provider>
  );
};
