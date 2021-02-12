import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { ProductsContext } from './ProductsContext';
import SmallItem from './SmallItem';

const Searched = () => {
  const [items, setItems] = React.useState(null);
  const [status, setStatus] = React.useState('loading');
  const { categoryId } = useParams();
  console.log(categoryId, 'categoryId');

  // React.useEffect(() => {
  //   fetch('/api/someproducts')
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setItems(json.data);
  //       setStatus('idle');
  //     });
  // }, []);

  React.useEffect(() => {
    fetch(`/api/category/${categoryId}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data);
        setStatus('idle');
      });
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <div className="___filterExample">FILTER BOX</div>{' '}
      {/*To replace with filter component later*/}
      <ItemsContainer>
        {items.map((item) => {
          // return <Item>{item.name}</Item>;
          return <SmallItem item={item} />;
        })}
      </ItemsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid blue 2px;
  height: 90%;
  display: flex;
  height: 100vh;

  .___filterExample {
    border: solid red 2px;
    margin: 0 15px;
    flex-basis: 15%;
  }
`;
const ItemsContainer = styled.div`
  border: solid green 2px;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 82%;
`;
const Item = styled.div`
  border: solid 2px gray;
  width: 250px;
  height: 420px;
  margin: 30px;
`;
export default Searched;
