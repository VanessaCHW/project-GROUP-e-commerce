import React from 'react';
import styled from 'styled-components';

import HomepageItems from './HomepageItems';
import { ProductsContext } from './ProductsContext';

const Homepage = () => {
  const { products, productsStatus } = React.useContext(ProductsContext);
  const [uniqueCategory, setUniqueCategory] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  const [hotItems, setHotItems] = React.useState(null);
  const [counter, setCounter] = React.useState(0);

  //Get unique categories
  React.useEffect(() => {
    fetch('/api/get-all-unique-categories')
      .then((res) => res.json())
      .then((json) => {
        setUniqueCategory(json.data);
        setStatus('idle');
      });
  }, []);

  if (status === 'loading') {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  return (
    <Wrapper>
      {/* <ItemsContainer> */}
      {/* <div>Almost out of stock!</div>
        <div className="container">
          {products.map((product) => {
            if (product.numInStock <= 2) {
              // setCounter(counter + 1);
              return <HomepageItems product={product} />;
            }
          })}
        </div> */}

      {uniqueCategory.map((category) => {
        return (
          <ItemsContainer>
            <h4>Hot items in {category}</h4>
            <HomepageItems category={category} />
          </ItemsContainer>
        );
      })}
      {/* </ItemsContainer> */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ItemsContainer = styled.div`
  border: solid 2px blue;

  /* .container {
    display: flex;
    overflow: auto;
  } */
`;
export default Homepage;
