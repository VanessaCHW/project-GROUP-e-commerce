import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomepageItems = ({ category }) => {
  const [products, setProducts] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    if (category.includes(' ')) {
      let newCategory = category.split(' ').join('-');
      fetch(`/api/category/${newCategory}`)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json, 'json');
          setProducts(json.data);
          setStatus('idle');
        });
    } else {
      fetch(`/api/category/${category}`)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json, 'json');
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
          if (2 >= product.numInStock > 0) {
            return (
              <Product to={`/product/${product._id}`}>
                <img src={product.imageSrc} />
              </Product>
            );
          }
        })}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;
const Product = styled(Link)`
  border: 1px solid #e5e7e9;
  display: inline-flex;
  min-width: 250px;
  justify-content: center;
  padding: 10px;
  //margin: 10px;

  img {
  }
`;
export default HomepageItems;
