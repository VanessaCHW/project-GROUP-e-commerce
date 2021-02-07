import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { ProductsProvider } from './components/ProductsContext';

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
