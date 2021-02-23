import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './Globalstyles';

import { ProductsContext } from './ProductsContext';
import Typehead from './Typehead';
import NavBar from './NavBar';
import Homepage from './Homepage';
import Searched from './Searched';
import Cart from './Cart';
import BigItem from './BigItem';
import Purchase from './Purchase';
import Confirmation from './Confirmation';

function App() {
  const { products, productsStatus } = React.useContext(ProductsContext);

  if (productsStatus === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header>
        <Typehead suggestions={products} />
        <NavBar />
      </Header>
      <Main>
        <Body>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/searched">
              <Searched />
            </Route>
            <Route exact path="/category/:categoryId">
              <Searched />
            </Route>
            <Route exact path="/product/:id">
              <BigItem />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/purchase">
              <Purchase />
            </Route>
            <Route exact path="/confirmation">
              <Confirmation />
            </Route>
          </Switch>
        </Body>
      </Main>
    </BrowserRouter>
  );
}

const Header = styled.div``;
const Main = styled.div`
  display: flex;
  height: 100%;
`;

const Body = styled.div`
  width: 100%;
`;

export default App;
