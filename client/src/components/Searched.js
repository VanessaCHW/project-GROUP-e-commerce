import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SmallCart from './SmallCart';

import { ProductsContext } from './ProductsContext';
import SmallItem from './SmallItem';
import FilterBox2 from './FilterBox2';
import { SearchContext } from './SearchContext';

const Searched = () => {
  const { products, searchStatus } = React.useContext(SearchContext);
  const [currentPage, setCurrentPage] = React.useState(0); //Pagination state
  const [filteredItems, setFilteredItems] = React.useState(products); // Copy of "items" to be filtered
  // For pagination links
  function handlePageClick({ selected: selectedPage }) {
    window.scrollTo(0, 0);
    setCurrentPage(selectedPage);
  }

  useEffect(() => {
    if (searchStatus === 'idle') {
      setFilteredItems(products);
    }
    setCurrentPage(0);
  }, [products, searchStatus]);

  if (searchStatus === 'loading') {
    return <div>Loading...</div>;
  } else {
    //Constants for pagination
    const itemsPerPage = 16;
    const offset = currentPage * itemsPerPage;
    const data = filteredItems.slice(offset, offset + itemsPerPage);
    const numPages = Math.ceil(filteredItems.length / itemsPerPage);
    return (
      <Wrapper>
        <FilterBox2
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          originalArray={products}
          setCurrentPage={setCurrentPage}
        />
        <ItemsContainer>
          {data.map((item) => {
            return <SmallItem item={item} key={item._id} id={item._id} />;
          })}
          {/* {products.map((product) => {
            return <SmallItem item={product} />;
          })} */}
          {numPages > 1 ? (
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
                data={data}
              />
            </Pagination>
          ) : null}
        </ItemsContainer>
        <SmallCart />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  //border: solid blue 2px;
  //height: 90%;
  display: flex;
  height: 100%;

  /*.___filterExample {
    border: solid red 2px;
    margin: 0 15px;
    flex-basis: 15%;
  }*/
`;
const ItemsContainer = styled.div`
  //border: solid green 2px;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 82%;
`;
/*const Item = styled.div`
  border: solid 2px gray;
  width: 250px;
  height: 420px;
  margin: 30px;
`;*/
const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 500;

  .pagination {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    .activeLink a {
      width: 100%;
      height: 100%;
      background-color: #b3cccc;
      font-weight: bold;
    }
  }
  .pagination a {
    padding: 6px 12px;
    margin: 0 2px;
    border-radius: 4px;
    &:hover {
      background-color: #b3cccc;
      cursor: pointer;
    }
  }
`;
export default Searched;
