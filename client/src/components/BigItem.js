//This component is used in a specific product page

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { ProductsContext } from './ProductsContext';
import { useDispatch } from 'react-redux'
import { addItem } from './action'

const BigItem = () => {
  let currentID = useParams().id;
  const [item, setItem] = useState(null);
  const { companies } = useContext(ProductsContext); //array of all companies
  const [vendor, setVendor] = useState(null); //to be displayed on page after filtering
  const [quantityBox, setQuantityBox] = useState(0);
  const dispatch = useDispatch();


  // Use the product ID to fetch all product data
  useEffect(() => {
    fetch(`/api/product-details/${currentID}`)
      .then((res) => res.json())
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.error('Unable to retrieve product details', error);
      });
  }, [currentID]);
  // Determine the vendor name by using a filter.
  // Using a hook for now because 'item' and 'companies' take time to load.
  useEffect(() => {
    if (item && companies) {
      let company = companies.find((company) => company._id === item.companyId);
      setVendor(company);
    }
  }, [item, companies]);


  const addQuantity = (quantity) => {
    setQuantityBox(quantity)
  }

  const addToCart = (item,qty) => {
    const action = addItem({...item, quantity: quantityBox}) 
    dispatch(action)
  }
  if (item && vendor) {
    return (
      <Wrapper>
        <Content>
          <ImgContainer>
            <Img src={item.imageSrc} />
          </ImgContainer>
          <InfoBox>
            <Name>{item.name}</Name>
            <Vendor target="_blank" to={vendor.url}>
              Visit the {vendor.name} website
            </Vendor>
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
            <QuantityButtons>
              <button
                onClick={() => addQuantity(quantityBox - 1)}
                disabled={
                  item.numInStock > 0 ? (quantityBox > 0 ? false : true) : true
                }
              >
                -
              </button>
              <Quantity
                value={quantityBox}
                onChange={(ev) => addQuantity(parseInt(ev.target.value))}
              />
              <button
                onClick={() => addQuantity(quantityBox + 1)}
                disabled={item.numInStock > 0 ? false : true}
              >
                +
              </button>
            </QuantityButtons>
            <Button onClick={() => addToCart(item)} >
              ADD TO CART
            </Button>
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
const Vendor = styled(Link)`
  text-decoration: none;
  color: #629d9d;
  &:hover {
    color: #cca300;
    cursor: pointer;
  }
`;
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
    &:disabled {
      cursor: not-allowed;
      background-color: black;
    }
  }
`;
const Quantity = styled.textarea`
  width: 40px;
  height: 26px;
  text-align: center;
  resize: none;
`;
const QuantityButtons = styled.div`
  display: flex;
  align-items: center;
`;
export default BigItem;
