import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <Wrapper>
      <Nav>
        {/* TODO: Add the rest of the categories */}
        <a href="/category/fitness">Fitness</a>
        <a href="/category/fitness">Fitness</a>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  nav {
    border: 5px pink solid;
    padding: 5px 0;
  }
`;
const Nav = styled.nav``;
export default NavBar;
