import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartItem from './CartItem';

const Cart = () => {
    const storeItems = useSelector((state) => state);
    const [total, setTotal] = useState()

    useEffect(() => {
        if (storeItems) {
          let sum = 0;
          Object.values(storeItems).map((item) => {
            sum += item.price.slice(1).replace(',', '') * item.quantity;
          });
          setTotal(sum.toFixed(2));
        }
      }, [storeItems]);


  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      <Container>
        {storeItems &&
          Object.values(storeItems).map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                id={item._id}
                quantity={item.quantity}
              />
            );
          })}
        <PurchasingSection>
          <PurchaseButton
            to={Object.values(storeItems).length > 0 ? '/purchase' : '/cart'}
          >
            Purchase
          </PurchaseButton>
          <Total>
            ${total}
          </Total>
        </PurchasingSection>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  padding: 50px;
  width: 100%;

  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  border-bottom: 2px solid lightgray;
  padding-bottom: 10px;
`;

const PurchasingSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PurchaseButton = styled(Link)`
  width: 120px;
  height: 30px;
  margin: 0px 10px;
  border: 1px solid black;
  text-decoration: none;
  text-align: center;
  :active {
      transform: translateY(3px);}
`;

const Total = styled.div`
  display: flex;
  font-size: 22px;
  font-weight:bold;

`;

export default Cart;
