import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { ProductsContext } from './ProductsContext';
import SmallItem from './SmallItem';
import FilterBox from './FilterBox';

const Searched = () => {
  const [items, setItems] = React.useState(null);
  const [status, setStatus] = React.useState('loading');
  const [currentPage, setCurrentPage] = React.useState(0); //Pagination state
  const [filteredItems, setFilteredItems] = React.useState(null); // Copy of "items" to be filtered
  const { categoryId } = useParams();
  const { searchedId } = useParams();

  React.useEffect(() => {
    // console.log(searchedId, 'inside useEffecy');
    if (categoryId) {
      fetch(`/api/category/${categoryId}`)
        .then((res) => res.json())
        .then((json) => {
          setItems(json.data);
          setFilteredItems(json.data);
          setStatus('idle');
        });
    }
    if (searchedId) {
      // console.log(searchedId, 'inside else if');
      fetch(`/api/products/search`, {
        method: 'POST',
        body: JSON,
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.data[1].suggestions, 'JSON SEARCHED');
          // setItems(json.data[1].suggestions);
          // setFilteredItems(json.data[1].suggestions);
          console.log(json, 'JSON INSIDE POST');
          setItems(json.data);
          setStatus('idle');
        });
    }
  }, [searchedId]);

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
    const data = filteredItems.slice(offset, offset + itemsPerPage);
    const numPages = Math.ceil(filteredItems.length / itemsPerPage);
    //console.log(items, 'ITEMS');
    return (
      <Wrapper>
        <FilterBox
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          originalArray={items}
          setCurrentPage={setCurrentPage}
        />
        <ItemsContainer>
          {data.map((item) => {
            return <SmallItem item={item} key={item._id} id={item._id} />;
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
              data={data}
            />
          </Pagination>
        </ItemsContainer>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  //border: solid blue 2px;
  //height: 90%;
  display: flex;
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
