import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <Wrapper>
      <nav>NAVIGATION BAR</nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  nav {
    border: 5px pink solid;
    padding: 5px 0;
  }
`;
export default NavBar;
