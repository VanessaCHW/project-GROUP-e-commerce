import React from 'react';
import styled from 'styled-components';

const Typehead = ({ suggestions }) => {
  const [value, setValue] = React.useState('');
  const [suggestionIndex, setSuggestionIndex] = React.useState(0);
  const matchedSuggestions =
    value.length > 1
      ? suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];
  const handleSelect = (suggestion) => {
    window.alert(suggestion);
  };

  return (
    <>
      <Wrapper>
        <div>
          <input
            type="text"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            onKeyDown={(ev) => {
              switch (ev.key) {
                case 'Enter': {
                  handleSelect(ev.target.value);
                  return;
                }
                case 'ArrowUp': {
                  if (suggestionIndex > 0) {
                    setSuggestionIndex(suggestionIndex - 1);
                  }
                  return;
                }
                case 'ArrowDown':
                  {
                    if (matchedSuggestions.length - 1 > suggestionIndex) {
                      setSuggestionIndex(suggestionIndex + 1);
                    }
                  }
                  return;
              }
            }}
          />
          <button onClick={() => setValue('')}>Clear</button>
        </div>
        <ul>
          {matchedSuggestions.map((suggestion, i) => {
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
              matchedSuggestions.indexOf(suggestion) === suggestionIndex
                ? true
                : false;
            console.log('firstpart', firstPart);
            console.log('secondpart', secondPart);
            console.log('slicedIndex', slicedIndex);
            return (
              <Suggestion
                key={suggestion._id}
                onClick={() => handleSelect(suggestion.name)}
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
              </Suggestion>
            );
          })}
        </ul>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

const Suggestion = styled.li`
  .written-part {
    font-weight: bold;
  }
`;

export default Typehead;
