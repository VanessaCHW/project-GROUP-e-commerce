import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './Globalstyles';

import Typehead from './Typehead';
import NavBar from './NavBar';
import Homepage from './Homepage';
import Searched from './Searched';
import SmallCart from './SmallCart';
import Cart from './Cart';
import BigItem from './BigItem';

function App() {
  // const [bacon, setBacon] = useState(null);
  const [items, setItems] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  // useEffect(() => {
  //   fetch('/bacon')
  //     .then((res) => res.json())
  //     .then((data) => setBacon(data));
  // }, []);
  React.useEffect(() => {
    fetch('/api/someproducts')
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data);
        setStatus('idle');
      });
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* {bacon ? bacon : `...where is my all my bacon?...`} */}
      <Header>
        <Typehead suggestions={items} />
        <NavBar />
      </Header>
      <Main>
        <Body>
          <Switch>
            <Route exact path="/">
              <Homepage />
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
          </Switch>
        </Body>
        <SmallCart />
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
