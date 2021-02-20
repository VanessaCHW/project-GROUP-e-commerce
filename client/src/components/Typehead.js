import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import uuid from 'uuid';

const Typehead = () => {
  const [status, setStatus] = React.useState('loading');
  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState(null);
  const [suggestionIndex, setSuggestionIndex] = React.useState(-1);
  const [ulToggle, setUlToggle] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    if (value.length >= 2) {
      console.log('useEffect after IF');
      fetch(`/api/typehead/${value}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json, 'JSON inside typehead fetch');
          setSuggestions(json.data);
          setStatus('idle');
        });
    }
  }, [value]);

  //HANDLERS
  const handleBackToHomepage = () => {
    history.push('/');
  };

  const handleSelect = (suggestion) => {
    // window.alert(suggestion);
    if (Array.isArray(suggestion) && suggestion.length > 1) {
      // console.log(suggestion, 'if');
      fetch('/api/products/search', {
        method: 'POST',
        body: JSON.stringify({ suggestions: suggestion }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json, 'json');
          history.push(`/searched/${json.id}`);
          return;
        });
    } else {
      history.push(`/product/${suggestion._id}`);
      console.log(suggestion, 'else');
    }
  };

  // if (status === 'idle') {
  //   console.log(suggestions, 'VALUE');
  // }
  return (
    <Wrapper>
      <Logo onClick={handleBackToHomepage}>LOGO</Logo>
      <div className="wrapper-helper">
        <div className="inputContainer">
          <input
            type="text"
            value={value}
            onChange={(ev) => {
              setValue(ev.target.value);
              setUlToggle(true);
              return;
            }}
            onKeyDown={(ev) => {
              switch (ev.key) {
                case 'Enter': {
                  if (suggestionIndex === -1) {
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
          <button
            className="searchBtn"
            onClick={() => handleSelect(suggestions)}
          >
            Search ALL
          </button>
        </div>
        {ulToggle && suggestions && (
          <ul>
            {suggestions.map((suggestion, i) => {
              const slicedIndex = suggestion.name
                .toLowerCase()
                .indexOf(value.toLowerCase());
              //IF sliceIndex === 0
              const firstPart = suggestion.name.slice(
                0,
                slicedIndex + value.length
              );
              //IF sliceIndex > 0
              const offFirstPartStart = suggestion.name.slice(0, slicedIndex);
              const offFirstPartStartWritten = suggestion.name.slice(
                slicedIndex,
                slicedIndex + value.length
              );
              //Rest of the suggestion
              const secondPart = suggestion.name.slice(
                slicedIndex + value.length
              );
              const isSelected =
                suggestions.indexOf(suggestion) === suggestionIndex
                  ? true
                  : false;

              return (
                <Suggestion
                  key={suggestion._id}
                  // onClick={() => handleSelect(suggestion.name)}
                  onClick={() => handleSelect(suggestions[suggestionIndex])}
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
        <CartButton to="/cart">Cart</CartButton>
      </CartWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid 2px red;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* flex-direction: column; */
  padding: 10px 0;
  position: relative;

  .wrapper-helper {
    border: solid 2px blue;
    position: relative;
    width: 50%;

    .inputContainer {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    input {
      width: 100%;
      &:focus {
        border: solid rgb(255, 153, 0) 2px;
        outline: none;
      }
    }
    .searchBtn {
      width: 12%;
    }
    ul {
      width: 100%;
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: absolute;
      background-color: white;
    }
  }
`;
const Logo = styled.div`
  border: solid 2px green;
  /* align-self: flex-start;
  justify-self: flex-start; */
  
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
  
`;

const CartButton = styled(Link)`
  border: 2px solid black;
  text-decoration: none;
  text-align: center;
  width: 50px;
  height: 30px;
`;

export default Typehead;
