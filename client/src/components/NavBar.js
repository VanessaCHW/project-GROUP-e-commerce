import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <Wrapper>
      <Nav>
        <a href="/category/fitness">Fitness</a>
        <a href="/category/medical">Medical</a>
        <a href="/category/lifestyle">Lifestyle</a>
        <a href="/category/entertainment">Entertainment</a>
        <a href="/category/pets-and-animals">Pets and Animals</a>
        <a href="/category/gaming">Gaming</a>
        <a href="/category/industrial">Industrial</a>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  nav {
    border: 5px pink solid;
    padding: 5px 0;
    display: flex;
    justify-content: flex-start;
  }
  a {
    color: inherit;
    text-decoration: none;
    border: solid 2px black;
    padding: 0 25px;
    margin: 0 10px;
  }
`;
const Nav = styled.nav``;
export default NavBar;
