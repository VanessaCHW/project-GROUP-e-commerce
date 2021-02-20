import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'

const CartItem = ({item}) => {
  const dispatch = useDispatch();

  // const addQuantity = (quantity) => {
  //   setQuantityBox(quantity)
  //   console.log(Quantity,"Aaaaaaaaa")
  // }
    return (
      <Wrapper>
        <Content>
          <ImgContainer>
            <Img src={item.imageSrc} />
          </ImgContainer>
          <InfoBox>
            <Name>{item.name}</Name>
            <hr />
            <Tags>
              <div>{item.category.toLowerCase()}</div>
              <div>{item.body_location.toLowerCase()}</div>
            </Tags>
            <Price>{item.price.slice(1)} $</Price>
            {/* <QuantityButtons>
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
            </QuantityButtons> */}
          </InfoBox>
        </Content>
      </Wrapper>
    );
  } 


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

export default CartItem;
