// import React, { useState, useContext, useEffect } from 'react';
// import { useSelector } from "react-redux";
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { ProductsContext } from './ProductsContext';
// import { getStoreItemArray } from "../reducers/index";
// import BigItem from './BigItem';

// const Cart = () => {
//   const storeItems = useSelector(getStoreItemArray);
//   const totalItems = storeItems.length
//   let total = 0;
//   storeItems.map((item) => (total += item.quantity * item.price));
//   let formatedPrice = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(total);

//   // const [items, setItems] = useState(null);
//   // const { companies } = useContext(ProductsContext);
//   // const [status, setStatus] = useState('loading');
//   // useEffect(() => {
//   //   fetch('/api/someproducts')
//   //     .then((res) => res.json())
//   //     .then((json) => {
//   //       setItems(json.data);
//   //       setStatus('idle');
//   //     });
//   // }, []);
//   // if (status === 'loading') {
//   //   return <div>Loading...</div>;
//   // }
//   return (
//     <Wrapper>
//       <nav>NAVIGATION BAR</nav>
//       <Container>
//         <CartTitle>Shopping Cart</CartTitle>
//         <NumItems onchange={()=>storeItems}>{totalItems} Items</NumItems>

//             <CartDiv>
//               {/* <CartImg src={item.imageSrc} /> */}
//               <CartInfo>
//                 {/* <CartName >{item.name}</CartName> {/* to={`/product/${item._id}`}*/}  


//                 {
//             storeItems.map((item)=> item.quantity&&item.quantity>0?
//             <BigItem
//                 // key={item.id} 
//                 // id={item.id} 
//                 // name={item.title}
//                 // quantity={item.quantity}
//             />:null)
//             }
//                 {/* <CartQuantity>
//                   <QuantityButton>-</QuantityButton>
//                   <QuantityInput text="text" />
//                   <QuantityButton>+</QuantityButton>
//                   <DeleteItemButton>Delete</DeleteItemButton>
//                 </CartQuantity>*/}
//               </CartInfo>
//               {/* <CartPrice>{item.price}</CartPrice>  */}
//             </CartDiv>
//         <CartSubtotal>
//           <h3>Subtotal: </h3>
//         <h3>${formatedPrice}</h3>
//         </CartSubtotal>
//       </Container>
//     </Wrapper>
//   );
// };

// const NumItems = styled.div`
//   font-size: 16px;
//   padding-top: 10px;
//   padding-left: 30px;
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   nav {
//     border: 2px solid black;
//     border-right: none;
//     height: 50px;
//     padding: 10px;
//   }
// `;
// const Container = styled.div`
//   margin: 20px;
// `;

// const CartTitle = styled.h1`
//   border-bottom: 2px solid lightgray;
//   padding-bottom: 10px;
// `;

// const CartDiv = styled.div`
//   display: flex;
//   height: 300px;
//   border-bottom: 2px solid lightgray;
//   margin: 20px;
// `;
// const CartImg = styled.img`
//   width: 250px;
//   height: 250px;
//   margin: 10px;
//   aspect-ratio: auto 100 / 100;
// `;
// const CartInfo = styled.div`
//   width: 600px;
// `;

// const CartName = styled(Link)`
//   font-size: 20px;
//   font-weight: bold;
//   color: black;
//   text-decoration: none;
// `;

// const CartQuantity = styled.div``;

// const QuantityButton = styled.button``;

// const QuantityInput = styled.input`
//   width: 30px;
// `;

// const DeleteItemButton = styled.button`
//   margin: 5px;
// `;

// const CartPrice = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   font-weight: bold;
//   font-size: 1.2rem;
//   width: 500px;
// `;

// const CartSubtotal = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   width: 100%;
//   padding-bottom: 30px;
//   padding-right: 20px;

//   h3 {
//     margin-top: 0;
//     margin-right: 10px;
//   }

//   p {
//     font-weight: bold;
//   }
// `;

// export default Cart;
