import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductsContext } from './ProductsContext';

const Confirmation = () => {
  const { purchaseConfirmation } = useContext(ProductsContext);
  if (purchaseConfirmation) {
    return (
      <Wrapper>
        <Greeting>Thank you for your order!</Greeting>
        <div className="confSection">
          Order number: {purchaseConfirmation.id}
        </div>
        <div className="confSection">
          <div className="title">Your order will be shipped to: </div>
          <div>{purchaseConfirmation.form.name}</div>
          <div>{purchaseConfirmation.form.address}</div>
          <div>
            {purchaseConfirmation.form.city},{' '}
            {purchaseConfirmation.form.province}
          </div>
          <div>{purchaseConfirmation.form.postalcode}, Canada</div>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Greeting>You have no pending orders.</Greeting>
        <div>Continue shopping</div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: 1130px;
  margin: 20px auto 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 2px solid #dddddd;
  .confSection {
    padding-bottom: 1rem;
  }
  .title {
    font-weight: 500;
  }
`;
const Greeting = styled.div`
  font-size: 2rem;
  padding-bottom: 1rem;
`;
export default Confirmation;
