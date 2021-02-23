import React from 'react';
import styled from 'styled-components';

import HomepageItems from './HomepageItems';
import { ProductsContext } from './ProductsContext';
import { SearchContext } from './SearchContext';
let test = 'fitness';

const Homepage = () => {
  const { products } = React.useContext(SearchContext);
  // const { products, productsStatus } = React.useContext(ProductsContext);
  const [uniqueCategory, setUniqueCategory] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

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
  } else {
    return (
      <Wrapper>
        {uniqueCategory.map((category) => {
          const itemInCategory = products.filter((item) => {
            return (
              item.category.split(' ').join('').toLowerCase() ===
              category.split('-').join('').toLowerCase()
            );
          });
          if (itemInCategory.some((item) => 2 >= item.numInStock > 0)) {
            return (
              <ItemsContainer>
                <h4>Hot items in {category}</h4>
                <HomepageItems category={category} />
              </ItemsContainer>
            );
          }
        })}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div``;
const ItemsContainer = styled.div`
  border-top: solid 2px #dddddd;
  margin: 50px 20px;

  /* .container {
    display: flex;
    overflow: auto;
  } */
`;
export default Homepage;
