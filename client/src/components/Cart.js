import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
// import { getItems } from '../reducers/cartReducer';
import CartItem from './CartItem';


const Cart = () => {
    const storeItems = useSelector((state) => state);
//     let total = 0;
//   storeItems.map((item) => (total += item.quantity * item.price));
//   let formatedPrice = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(total / 100);

    return (
    <Wrapper>
        <Title>Shopping Cart</Title>
        <Container>
            {storeItems && 
            Object.values(storeItems).map((item) => {
            return(
                <CartItem 
                    key={item.id}
                    item={item}
                    id={item._id}
                    quantity={item.quantity}
                /> );
            })
            }
            <PurchasingSection>
            <PurchaseButton>Purchase</PurchaseButton>
                <Total>
                    Total: <b>$0.00</b>
                    {/* {total > 0 ? <b>{formatedPrice}</b> : <b>$0.00</b>} */}
                </Total>
                
            </PurchasingSection>
        </Container>
    </Wrapper>
);
};


const Wrapper = styled.div`
    margin:auto;
    padding:50px;
    width: 100%;
    
    justify-content:center;
`;

const Container = styled.div`
    width:100%;
    
`;

const Title = styled.h2`
    border-bottom:2px solid lightgray;
    padding-bottom:10px;
    
`;

const PurchasingSection = styled.div`
    display:flex;
    justify-content:flex-end;
    
    
`;

const PurchaseButton = styled.button`
    width: 120px;
    height:30px;
    margin: 0px 10px;
    `;

const Total = styled.div`
    display:flex;
    font-size: 22px;

`;

export default Cart;
