import React from 'react';
import styled from 'styled-components';

const HomepageItems = ({ category }) => {
  const [products, setProducts] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    if (category.includes(' ')) {
      let newCategory = category.split(' ').join('-');
      fetch(`/api/category/${newCategory}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json, 'json');
          setProducts(json.data);
          setStatus('idle');
        });
    } else {
      fetch(`/api/category/${category}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json, 'json');
          setProducts(json.data);
          setStatus('idle');
        });
    }
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        {products.map((product) => {
          if (product.numInStock <= 2) {
            // setCounter(counter + 1);

            return (
              <Product>
                <img src={product.imageSrc} />
              </Product>
            );
          } else {
            return;
          }
        })}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  border: solid green 2px;
  display: flex;
  overflow-x: auto;
`;
const Product = styled.div`
  border: solid red 1px;
  border: solid red 1px;
  display: inline-flex;
  min-width: 250px;
  justify-content: center;
  padding: 10px;
  //margin: 10px;

  img {
  }
`;
export default HomepageItems;
