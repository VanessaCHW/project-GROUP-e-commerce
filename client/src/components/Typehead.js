import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { SearchContext } from './SearchContext';

import { AiOutlineShoppingCart as CartLogo } from 'react-icons/ai';

const Typehead = () => {
  const {
    actions: { searchByKeyword, searchAll },
  } = React.useContext(SearchContext);
  const [status, setStatus] = React.useState('loading');
  const [searchValue, setSearchValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState(null);
  const [suggestionIndex, setSuggestionIndex] = React.useState(-1);
  const [ulToggle, setUlToggle] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    fetch(`/api/search/${searchValue}`)
      .then((res) => res.json())
      .then((json) => {
        setSuggestions(json.data);
        setStatus('idle');
      });
  }, [searchValue]);

  //HANDLERS
  const handleBackToHomepage = () => {
    searchAll();
    history.push('/');
  };

  const handleSearch = () => {
    if (searchValue > 0) {
      searchByKeyword(searchValue);
      history.push('/searched');
    } else {
      return;
    }
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  // if (status === 'idle') {
  //   console.log(suggestions, 'VALUE');
  // }
  return (
    <Wrapper>
      <Logo onClick={handleBackToHomepage}>Grade</Logo>
      <div className="wrapper-helper">
        <div className="inputContainer">
          <input
            type="text"
            value={searchValue}
            onChange={(ev) => {
              setSearchValue(ev.target.value);
              setUlToggle(true);
            }}
            onKeyDown={(ev) => {
              switch (ev.key) {
                case 'Enter': {
                  if (suggestionIndex === -1) {
                    handleSearch(searchValue);
                    // handleMatchedSuggestions(matchedSuggestions);
                    // setUlToggle(false);
                    // return;
                  } else {
                    // handleSelect(matchedSuggestions[suggestionIndex]);
                    // setValue(matchedSuggestions[suggestionIndex].name);
                    // setUlToggle(false);
                    // return;
                  }
                  setUlToggle(false);
                  return;
                }
                case 'ArrowUp': {
                  if (suggestionIndex > -1) {
                    setSuggestionIndex(suggestionIndex - 1);
                  }
                  return;
                }
                case 'ArrowDown':
                  {
                    if (suggestions.length - 1 > suggestionIndex) {
                      setSuggestionIndex(suggestionIndex + 1);
                    }
                  }
                  return;
              }
            }}
          />
          {/* <button className="clearBtn" onClick={() => setValue('')}> */}
          <button className="searchBtn" onClick={() => handleSearch()}>
            Search ALL
          </button>
        </div>
        {ulToggle && suggestions && (
          <ul>
            {suggestions.map((suggestion, i) => {
              const slicedIndex = suggestion.name
                .toLowerCase()
                .indexOf(searchValue.toLowerCase());
              //IF sliceIndex === 0
              const firstPart = suggestion.name.slice(
                0,
                slicedIndex + searchValue.length
              );
              //IF sliceIndex > 0
              const offFirstPartStart = suggestion.name.slice(0, slicedIndex);
              const offFirstPartStartWritten = suggestion.name.slice(
                slicedIndex,
                slicedIndex + searchValue.length
              );
              //Rest of the suggestion
              const secondPart = suggestion.name.slice(
                slicedIndex + searchValue.length
              );
              const isSelected =
                suggestions.indexOf(suggestion) === suggestionIndex
                  ? true
                  : false;

              return (
                <Suggestion
                  key={suggestion._id}
                  // onClick={() => handleSelect(suggestion.name)}
                  onClick={() => handleSearch(suggestions[suggestionIndex])}
                  style={{
                    background: isSelected
                      ? 'hsla(50deg, 100%, 80%, 0.25)'
                      : 'transparent',
                  }}
                  onMouseEnter={() => {
                    setSuggestionIndex(i);
                  }}
                >
                  {slicedIndex === 0 ? (
                    <span className="written-part">{firstPart}</span>
                  ) : (
                    <>
                      <span>{offFirstPartStart}</span>
                      <span className="written-part">
                        {offFirstPartStartWritten}
                      </span>
                    </>
                  )}
                  <span>{secondPart}</span>
                  <span className="item-category">
                    in {suggestion.category}
                  </span>
                </Suggestion>
              );
            })}
          </ul>
        )}
      </div>
      <CartWrapper>
        <CartLogo className="cartLogo" onClick={handleCartClick} />
      </CartWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #c7c7c7;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* flex-direction: column; */
  padding: 20px 0;
  position: relative;

  .wrapper-helper {
    position: relative;
    width: 50%;

    .inputContainer {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    input {
      width: 100%;
      height: 40px;
      outline: none;
      border: none;
      border-radius: 15px 0 0 15px;

      &:focus {
        outline: none;
        box-shadow: 0 0 5px 3px #888;
      }
    }
    .searchBtn {
      width: 12%;
      outline: none;
      border: none;
      border-radius: 0 15px 15px 0;

      &:hover {
        box-shadow: 0 0 5px 3px #888;
      }
    }
    ul {
      width: 100%;
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: absolute;
      background-color: #f5f5f5;
      border-radius: 20px;
    }
  }
`;
const Logo = styled.div`
  /* align-self: flex-start;
  justify-self: flex-start; */
  font-size: 2.5em;
  font-family: 'Akaya Telivigala', cursive;
  color: #505050;

  top: 10%;
  bottom: 10%;
  left: 10px;
  padding: 0 20px;
`;

const Suggestion = styled.li`
  padding: 5px 6px;
  .written-part {
    font-weight: bold;
  }
  .item-category {
    color: rgb(169, 169, 169);
    padding-left: 30px;
    font-size: 0.8em;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;

  .cartLogo {
    font-size: 3em;
    text-align: center;
    margin-right: 30px;
    color: #505050;
    &:hover {
      cursor: pointer;
      color: #62acb5;
    }
  }
`;

const CartButton = styled(Link)`
  border: 2px solid black;
  text-decoration: none;
  text-align: center;
  width: 50px;
  height: 30px;
  margin-right: 20px;
`;

export default Typehead;
