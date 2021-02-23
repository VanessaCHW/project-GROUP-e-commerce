import React, { useState,  useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SmallCart = () => {
  const storeItems = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  // const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (storeItems) {
      let sum = 0;
      Object.values(storeItems).map((item) => {
        sum += item.price.slice(1).replace(',', '') * item.quantity;
      });
      setTotal(sum.toFixed(2));
    }
  }, [storeItems]);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }
  return (
    <Container>
      <Div>
        {/* <h3>Currently in your cart:</h3> */}
        <Subtotal>
          <p>Subtotal</p>
          <span>${total}</span>
        </Subtotal>
        {Object.values(storeItems).map((item) => (
            <SmallCartDiv to={`/product/${item._id}`}>
              <SmallCartImgHelper>
                <SmallCartImg src={item.imageSrc} />
              </SmallCartImgHelper>
              {/* <SmallCartInfo>
                <SmallCartName>{item.name.substring(0, 17)}... </SmallCartName>
                <SmallCartPrice>{item.price}</SmallCartPrice>
                <SmallCartQuantity>Quantity: {item.quantity}</SmallCartQuantity>
              </SmallCartInfo> */}
            </SmallCartDiv>
        ))}
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  border-left: solid 2px #dddddd;
  position: sticky;
  top: 0;
  z-index: 10;
  /* margin-left: 20px; */
  h3 {
    font-weight: 500;
  }
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

const SmallCartImgHelper = styled.div`
  height: 129px;
  width: 122px;
  /* margin: 10px; */
  display: flex;
  align-items: center;
`;
const SmallCartImg = styled.img`
  width: 100%;
  height: auto;
`;

const SmallCartName = styled.p``;

const SmallCartPrice = styled.p``;

const SmallCartQuantity = styled.p``;

const SmallCartDiv = styled(Link)`
  display: flex;
  padding: 10px;
  width: 150px;
  margin-left:10px;
  margin-bottom:20px;
  text-decoration: none;
  align-items: center;
  /* margin: 5px; */
`;

const SmallCartInfo = styled.div`
  font-size: 14px;
  line-height: 10px;
`;

export default SmallCart;
