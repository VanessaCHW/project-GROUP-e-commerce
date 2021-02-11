//This component is used in a specific product page

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { ProductsContext } from './ProductsContext';

const BigItem = () => {
  let currentID = useParams().id;
  const [item, setItem] = useState(null);
  const { companies } = useContext(ProductsContext);
  const [vendor, setVendor] = useState(null);

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

  useEffect(() => {
    if (item && companies) {
      let company = companies.find((company) => company._id === item.companyId);
      setVendor(company);
    }
  }, [item, companies]);

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
            {vendor ? (
              <Vendor target="_blank" href={vendor.url}>
                Visit the {vendor.name} website
              </Vendor>
            ) : null}
            <hr />
            <Tags>
              <div>{item.category.toLowerCase()}</div>
              <div>{item.body_location.toLowerCase()}</div>
            </Tags>
            <Price>{item.price.slice(1)} $</Price>
            {item.numInStock > 0 ? (
              <div>In stock</div>
            ) : (
              <div>Out of stock</div>
            )}
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

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  div {
    background-color: #d1e0e0;
    margin-right: 5px;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 0 5px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  nav {
    border: 2px black solid;
    height: 5%;
  }
  hr {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 15px;
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
const Vendor = styled.a`
  text-decoration: none;
  color: #629d9d;
  &:hover {
    color: #cca300;
    cursor: pointer;
  }
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 40px 0 20px 0;
`;

const Button = styled.button`
  background-color: black;
  border-style: none;
  color: white;
  border: 1px solid black;
  padding: 10px;
  width: 50%;
  margin: 10px 0;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`;
const Quantity = styled.input`
  width: 30px;
`;

export default BigItem;
