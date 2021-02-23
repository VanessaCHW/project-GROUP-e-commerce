import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { updateQuantity, removeItem } from './action'

const CartItem = ({item ,id , quantity}) => {
  const dispatch = useDispatch();

  console.log(quantity, 'quantity in CartItem.js')

  const updateQuantityInCart = (id, quantity) => {
    const actionUpdate = updateQuantity(id, quantity)
      dispatch(actionUpdate)
    }

  const removeItemInCart = (id, item) => {
    const actionRemove = removeItem(id, item)
      dispatch(actionRemove)
    }
  // const addToCart = (item) => {
  //   const action = addItem(item)
  //   dispatch(action)
  // }
  console.log(item,"ITEM")
    return (
      
      
      <Wrapper>
        
        <Content>
          <ImgContainer>
            <Img src={item.imageSrc} />
          </ImgContainer>
            <InfoBox>
            <Name>{item.name}</Name>
            <CategoryTags>
              <div>{item.category}</div>
              <div>{item.body_location}</div>
            </CategoryTags>
            <QuantityDiv>
              <QuantityButton
                onClick={() => updateQuantityInCart(id, quantity - 1)}
                disabled={
                  item.numInStock > 0 ? (quantity > 0 ? false : true) : true
                }
              >
                -
              </QuantityButton>
              <Quantity
                value={quantity}
                onChange={(ev) => updateQuantityInCart(id, parseInt(ev.target.value))}
              />
              <QuantityButton  // => dispatch(updateQuantity({quantity}))
                onClick={() => updateQuantityInCart(id, quantity+ 1)}
                disabled={item.numInStock > 0 ? false : true}
              >
                +
              </QuantityButton>
              <DeleteButton onClick={() => removeItemInCart(id, item)}>Delete</DeleteButton>

            </QuantityDiv>
          </InfoBox>
          <Price>{item.price}</Price>
        </Content>
      </Wrapper>

    );
  } 


const Wrapper = styled.div`
width:100%;
  justify-content: center;
`;

const Content = styled.div`
  
 
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  border-bottom:2px solid lightgray;
  padding-bottom:20px;
  margin-bottom:20px;
`;

const ImgContainer = styled.div`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow: hidden;
margin:30px;
margin-right:0;
`;
const Img = styled.img`
  width: 100%;
`;
const InfoBox = styled.div`
  width: 500px;
`;
const Name = styled.div`
  font-size: 25px;
  /* line-height: 10px; */
  margin-bottom: 20px;
  font-weight:bold;
`;

const CategoryTags = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom:10px;
  div {
    background-color: #d1e0e0;
    margin-right: 5px;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 0 5px;
  }
`;


const QuantityDiv= styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: 1px solid #bfbfbf;
  height: 30px;
  width: 30px;
  /* font-size: 1.5rem; */
`;

const Quantity = styled.textarea`
  width: 30px;
  height: 30px;
  text-align: center;
  resize: none;
  border: 1px solid black;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
    margin-left:10px;
    height:30px;
    :active {
      transform: translateY(3px);}
`;

const Price = styled.div`
  font-size: 25px;
  font-weight: 500;
  
  /* margin-left: 50px ; */
`;

export default CartItem;
