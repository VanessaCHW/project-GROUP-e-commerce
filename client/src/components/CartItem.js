import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { updateQuantity, removeItem } from './action'

const CartItem = ({item ,id , quantity}) => {
  // const [quantity, setQuantity] = useState(null)
  const dispatch = useDispatch();

  console.log(quantity, 'quantity in CartItem.js')
  const updateQuantityInCart = (id, quantity) => {
  const addNumber = updateQuantity(id, quantity)
      dispatch(addNumber)}




  // const removeItem = (item) => {
  //   setQuantityBox(quantity)
  // }
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
            <Price>{item.price}</Price>
            <QuantityButtons>
              <button
                onClick={() => updateQuantityInCart(id, quantity - 1)}
                disabled={
                  item.numInStock > 0 ? (quantity > 0 ? false : true) : true
                }
              >
                -
              </button>
              <Quantity
                value={quantity}
                onChange={(ev) => updateQuantityInCart(id, parseInt(ev.target.value))}
              />
              <button  // => dispatch(updateQuantity({quantity}))
                onClick={() => updateQuantityInCart(id, quantity+ 1)}
                disabled={item.numInStock > 0 ? false : true}
              >
                +
              </button>
            </QuantityButtons>
          </InfoBox>
        </Content>
      </Wrapper>
    );
  } 


const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const ImgContainer = styled.div`
  width: 200px;
  height: 200px;
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

const CategoryTags = styled.div`
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

const QuantityButtons = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.textarea`
  width: 40px;
  height: 26px;
  text-align: center;
  resize: none;
`;

export default CartItem;
