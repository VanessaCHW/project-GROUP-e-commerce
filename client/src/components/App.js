import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './Globalstyles';
import Searched from './Searched';
import SmallCart from './SmallCart';
import BigItem from './BigItem';

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch('/bacon')
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* {bacon ? bacon : `...where is my all my bacon?...`} */}
      <Main>
        <Body>
          <Switch>
            <Route exact path="/">
              <Searched />
            </Route>
            <Route exact path="/product/:id">
              <BigItem />
            </Route>
          </Switch>
        </Body>
        <SmallCart />
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.div`
  display: flex;
  height: 100vh;
`;

const Body = styled.div`
  width: 100%;
`;

export default App;
