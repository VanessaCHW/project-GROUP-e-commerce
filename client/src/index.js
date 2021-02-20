import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import App from './components/App';
import cartReducer from "./reducers/cartReducer"
import { Provider } from 'react-redux';
import { ProductsProvider } from './components/ProductsContext';

const store = createStore(cartReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ProductsProvider >
      <App />
      </ProductsProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
