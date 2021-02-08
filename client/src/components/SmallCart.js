import React from 'react';
import styled from 'styled-components';

const SmallCart = () => {
  return (
    <Container>
      <Div>
        <h1>Small cart</h1>
        Items
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;

  border: solid 2px black;
`;

const Div = styled.div`
  flex-direction: column;
`;

export default SmallCart;
