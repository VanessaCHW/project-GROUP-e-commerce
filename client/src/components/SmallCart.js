import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SmallCart = () => {
  const [items, setItems] = useState(null);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
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
        <h3>Currently in your cart</h3>
        <Subtotal>
          <p>Subtotal</p>
          <span>$00.00</span>
        </Subtotal>
        {items.map((item) => {
          return (
            <SmallCartDiv to={`/product/${item._id}`}>
              <SmallCartImg src={item.imageSrc} />
              <SmallCartInfo>
                <SmallCartName>{item.name.substring(0, 17)}... </SmallCartName>
                <SmallCartPrice>{item.price}</SmallCartPrice>
                <SmallCartQuantity>Quantity: 1</SmallCartQuantity>
              </SmallCartInfo>
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
  height: 100%;
  border: solid 2px black;
  position: sticky;
        top: 0;
`;

const Div = styled.div`
  flex-direction: column;
  text-align: center;
  h3 {
    margin: 5px;
  }
`;

const Subtotal = styled.div`
  p {
    margin: 5px;
  }
  span {
    font-weight: bold;
    color: #b12704;
  }
`;

const SmallCartImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
  aspect-ratio: auto 100 / 100;
`;

const SmallCartName = styled.p``;

const SmallCartPrice = styled.p``;

const SmallCartQuantity = styled.p``;

const SmallCartDiv = styled(Link)`
  display: flex;
  padding: 10px;
  width: 310px;
  text-decoration: none;
  /* margin: 5px; */
`;

const SmallCartInfo = styled.div`
  font-size: 14px;
  line-height: 10px;
`;

export default SmallCart;
