//This component is used in a specific product page

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { ProductsContext } from './ProductsContext';
import { useDispatch } from 'react-redux';
import { addItem } from './action';

import SmallCart from './SmallCart';

const BigItem = () => {
  let currentID = useParams().id;
  const [item, setItem] = useState(null);
  const { companies } = useContext(ProductsContext); //array of all companies
  const [vendor, setVendor] = useState(null); //to be displayed on page after filtering
  const [quantityBox, setQuantityBox] = useState(1);
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
    setQuantityBox(quantity);
  };

  const addToCart = (item, qty) => {
    const action = addItem({ ...item, quantity: quantityBox });
    dispatch(action);
  };

  if (item && vendor) {
    return (
      <Wrapper>
        <ImgContainer>
          <Img src={item.imageSrc} />
        </ImgContainer>
        <InfoBox>
          <div>
            <Link className="topLink" to="/">
              Home
            </Link>{' '}
            ›{' '}
            <Link className="topLink" to={`/category/{item.category}`}>
              {item.category}
            </Link>
          </div>
          <Name>{item.name}</Name>
          <Vendor target="_blank" href={vendor.url}>
            Visit the {vendor.name} website
          </Vendor>
          <Price>{item.price.slice(1)} $</Price>

          <Description>
            <Desc>
              <DescHead>Description:</DescHead>
              <div>{item.name}</div>
            </Desc>{' '}
            <Desc>
              <DescHead>Product ID:</DescHead>
              <div>{currentID}</div>
            </Desc>
            <Desc>
              <DescHead>Brand:</DescHead>
              <div> {vendor.name}</div>
            </Desc>
            <Desc>
              <DescHead>Country:</DescHead>
              <div> {vendor.country}</div>
            </Desc>
            <Desc>
              <DescHead>Type:</DescHead>
              <div> {item.category}</div>
            </Desc>
            <Desc>
              <DescHead>Body location:</DescHead>
              <div> {item.body_location}</div>
            </Desc>
          </Description>

          <QuantityButtons>
            <QtyButton
              onClick={() => {
                if (quantityBox > 1) {
                  addQuantity(quantityBox - 1);
                }
              }}
              disabled={
                item.numInStock > 0 ? (quantityBox > 0 ? false : true) : true
              }
            >
              -
            </QtyButton>
            <Quantity
              value={quantityBox}
              onChange={(ev) => addQuantity(parseInt(ev.target.value))}
            />
            <QtyButton
              onClick={() => addQuantity(quantityBox + 1)}
              disabled={item.numInStock > 0 ? false : true}
            >
              +
            </QtyButton>
            {item.numInStock > 0 ? (
              <InStock>Article in stock ({item.numInStock})</InStock>
            ) : (
              <OutOfStock>Out of stock</OutOfStock>
            )}
          </QuantityButtons>
          <Button
            disabled={item.numInStock > 0 ? false : true}
            onClick={() => addToCart(item)}
          >
            ADD TO CART
          </Button>
        </InfoBox>
        <SmallCart />
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
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .topLink {
    color: #62acb5;
    text-decoration: none;
    &:hover {
      color: #f4b95f;
      cursor: pointer;
    }
  }
`;

const ImgContainer = styled.div`
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: start;
  display: flex;
  background-color: #e5e7e9;
  flex: 3;
`;
const Img = styled.img`
  max-height: 90vh;
  width: 100%;
  padding: 10vh 15% 10% 15%;
  filter: brightness(90%);
`;
const InfoBox = styled.div`
  padding: 70px 30px 0px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const Name = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  padding-top: 1rem;
`;
const Vendor = styled.a`
  text-decoration: none;
  color: #62acb5;
  padding-top: 10px;
  &:hover {
    color: #f4b95f;
    cursor: pointer;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1.5rem;
  padding: 1.5rem 0 20px 0;
  border-top: 1px solid #dddddd;
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid black;
  padding: 1rem;
  width: 50%;
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: black;
  letter-spacing: 1px;
  /* :active {
      transform: translateY(3px);} */

  &:hover {
    cursor: pointer;
    &:enabled {
      background: rgb(229, 229, 229);
      transition: ease-in 0.1s;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
const Quantity = styled.textarea`
  width: 40px;
  height: 40px;
  text-align: center;
  resize: none;
  border: 1px solid black;
  font-size: 1.3rem;
`;
const QuantityButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;
const QtyButton = styled.button`
  background-color: transparent;
  border: 1px solid #bfbfbf;
  height: 40px;
  width: 35px;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.div`
  padding-bottom: 2rem;
`;
const Desc = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.2rem 0;
`;
const DescHead = styled.div`
  font-weight: 500;
  min-width: 140px;
`;
const InStock = styled.div`
  color: #b2b356;
  font-size: 1.2rem;
  padding-left: 10px;
`;
const OutOfStock = styled.div`
  color: #e4324c;
  font-size: 1.2rem;
  padding-left: 10px;
`;
export default BigItem;
