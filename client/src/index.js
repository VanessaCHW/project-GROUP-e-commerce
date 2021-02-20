import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './components/App';
import cartReducer from './reducers/cartReducer';
import { Provider } from 'react-redux';
import { ProductsProvider } from './components/ProductsContext';
import { SearchProvider } from './components/SearchContext';

const store = createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </SearchProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
