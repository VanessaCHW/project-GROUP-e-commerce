import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Searched from './Searched';

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch('/bacon')
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <BrowserRouter>
      {/* {bacon ? bacon : `...where is my all my bacon?...`} */}
      <Switch>
        <Route exact path="/">
          <Searched />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
