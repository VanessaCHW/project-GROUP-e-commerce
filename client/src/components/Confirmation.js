import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductsContext } from './ProductsContext';

const Confirmation = () => {
  const { purchaseConfirmation } = useContext(ProductsContext);
  if (purchaseConfirmation) {
    return (
      <Wrapper>
        <div>Thank you for your order</div>
        <div>Order number: {purchaseConfirmation.id}</div>
        <div>Your order will be shipped to: </div>
        <div>{purchaseConfirmation.form.name}</div>
        <div>{purchaseConfirmation.form.address}</div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div>You have no pending orders.</div>
        <div>Continue shopping</div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Confirmation;
