import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getItems } from '../reducers/cartReducer';
import CartItem from './CartItem';


const Cart = () => {
    const storeItems = useSelector((state) => state);
    console.log(storeItems,"storeItems")
    return (
    <Wrapper>
        <Container>
            {storeItems && 
            Object.values(storeItems).map((item) => (
            <CartItem 
            key={item.id}
            item={item}
            />
            ))
            }
        </Container>
    </Wrapper>
);
};


const Wrapper = styled.div`
    width: 100%;
`;
const Container = styled.div`
    margin: 20px;
`;

export default Cart;
