//This component is used in a specific product page

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const BigItem = () => {
  let currentID = useParams().id;
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/product-details/${currentID}`)
      .then((res) => res.json())
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.error('Unable to retrieve product details', error);
      });
  }, []);

  if (item) {
    return (
      <Wrapper>
        <nav>NAVIGATION BAR</nav>
        <Content>
          <ImgContainer>
            <Img src={item.imageSrc} />
          </ImgContainer>
          <InfoBox>
            <Name>{item.name}</Name>
            <Vendor to="#">Vendor name {item.companyId}</Vendor>
            <Price>{item.price.slice(1)} $</Price>
            <div>Stock: {item.numInStock}</div>
            <button>-</button>
            <Quantity type="text" />
            <button>+</button>
            <div></div>
            <Button>ADD TO CART</Button>
          </InfoBox>
        </Content>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div>Loading.................</div>
      </Wrapper>
    );
  }
};
const Quantity = styled.input`
  width: 30px;
`;
const Wrapper = styled.div`
  width: 100%;
  nav {
    border: 2px black solid;
    height: 5%;
  }
`;

const Content = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow: hidden;
  margin-right: 50px;
`;
const Img = styled.img`
  width: 100%;
`;
const InfoBox = styled.div`
  width: 500px;
`;
const Name = styled.div`
  font-size: 1.8rem;
  line-height: 2rem;
  margin-bottom: 10px;
`;
const Vendor = styled(Link)`
  text-decoration: none;
  color: #629d9d;
  &:hover {
    color: magenta;
  }
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 20px 0 20px;
`;

const Button = styled.button`
  background-color: black;
  border-style: none;
  color: white;
  border: 1px solid black;
  padding: 10px;
  width: 100%;
  margin: 10px 0;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`;

const OutOfStock = styled.div`
  font-size: 0.8rem;
  color: #ff8080;
`;

const InStock = styled.div`
  font-size: 0.8rem;
  color: #75a3a3;
`;

export default BigItem;
