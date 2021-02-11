import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SmallCart = () => {
  const [items, setItems] = React.useState(null);
  const [status, setStatus] = React.useState('loading');
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
    <Container>
      <Div>
        <h1>Small cart</h1>
        {items.map((item) => {
          return (
            <SmallCartDiv to="/product/:id">
              <SmallCartImg src={item.imageSrc} />
              <SmallCartName>{item.name} </SmallCartName>
              <SmallCartPrice>{item.price}</SmallCartPrice>
            </SmallCartDiv>
          );
        })}
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;

  border: solid 2px black;
`;

const Div = styled.div`
  flex-direction: column;
  border: 2px solid black;
`;

const SmallCartImg = styled.img`
  width: 100px;
  height: 100px;
  aspect-ratio: auto 100 / 100;
`;

const SmallCartName = styled.p``;

const SmallCartPrice = styled.p``;

const SmallCartDiv = styled(Link)`
  display: flex;
  padding: 20px;
  width: 350px;
`;

export default SmallCart;
