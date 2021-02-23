import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SmallItem = ({ item }) => {
  return (
    <Wrapper to={`/product/${item._id}`}>
      <div className="img-wrapper">
        <Img src={item.imageSrc} />
      </div>
      <Name>{item.name}</Name>
      <Price>{item.price}</Price>
      {item.numInStock > 0 ? (
        <InStock>✓ in stock</InStock>
      ) : (
        <OutOfStock>out of stock</OutOfStock>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  width: 250px;
  height: 420px;
  margin: 30px;
  padding: 10px;
  border: 1px solid transparent; // So the page doesn't shift with the mouse-over
  /* border-radius: 4px; */
  border-top: solid 2px rgb(221, 221, 221);
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #b1cece;
  }
  .img-wrapper {
    width: 250px;
    height: 280px;
    text-align: center;
    display: flex;
    align-items: center;
  }
`;

const OutOfStock = styled.div`
  font-size: 0.8rem;
  color: #e4324c;
`;

const InStock = styled.div`
  font-size: 0.8rem;
  color: #b2b356;
`;
const Price = styled.div`
  font-weight: 500;
`;
const Name = styled.div`
  font-size: 0.9rem;
  line-height: 1rem;
  margin: 15px 0 5px; //top right/left bottom
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
`;

export default SmallItem;
