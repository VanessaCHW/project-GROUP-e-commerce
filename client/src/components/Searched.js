import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { ProductsContext } from './ProductsContext';
import SmallItem from './SmallItem';

const Searched = () => {
  const [items, setItems] = React.useState(null);
  const [status, setStatus] = React.useState('loading');
  const [currentPage, setCurrentPage] = React.useState(0);
  const { categoryId } = useParams();

  React.useEffect(() => {
    fetch(`/api/category/${categoryId}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data);
        setStatus('idle');
      });
  }, []);

  // For pagination links
  function handlePageClick({ selected: selectedPage }) {
    window.scrollTo(0, 0);
    setCurrentPage(selectedPage);
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else {
    //Constants for pagination
    const itemsPerPage = 24;
    const offset = currentPage * itemsPerPage;
    const data = items.slice(offset, offset + itemsPerPage);
    const numPages = Math.ceil(items.length / itemsPerPage);
    return (
      <Wrapper>
        <div className="___filterExample">FILTER BOX</div>{' '}
        {/*To replace with filter component later*/}
        <ItemsContainer>
          {data.map((item) => {
            // return <Item>{item.name}</Item>;
            return <SmallItem item={item} key={item._id} />;
          })}
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              pageCount={numPages}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              previousLinkClassName={'previousLink'}
              nextLinkClassName={'nextLink'}
              disabledClassName={'disabledLink'}
              activeClassName={'activeLink'}
            />
          </Pagination>
        </ItemsContainer>
      </Wrapper>
    );
  }
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
const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .pagination {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin-bottom: 40px;

    .activeLink a {
      width: 100%;
      height: 100%;
      background-color: #b3cccc;
      font-weight: bold;
    }
  }
  .pagination a {
    border: 1px solid black;
    padding: 10px 20px;
    margin: 2px;
  }
`;
export default Searched;
