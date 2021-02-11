import React, { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [productsStatus, setProductsStatus] = useState('loading');

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

  return (
    <ProductsContext.Provider value={{ products, productsStatus }}>
      {children}
    </ProductsContext.Provider>
  );
};
