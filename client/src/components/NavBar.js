import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Wrapper>
      <Nav>
        <StyledLink to="/category/fitness">Fitness</StyledLink>
        <StyledLink to="/category/medical">Medical</StyledLink>
        <StyledLink to="/category/lifestyle">Lifestyle</StyledLink>
        <StyledLink to="/category/entertainment">Entertainment</StyledLink>
        <StyledLink to="/category/pets-and-animals">Pets and Animals</StyledLink>
        <StyledLink to="/category/gaming">Gaming</StyledLink>
        <StyledLink to="/category/industrial">Industrial</StyledLink>
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
`;
const Nav = styled.nav``;

const StyledLink = styled(Link)`
  color: inherit;
    text-decoration: none;
    border: solid 2px black;
    padding: 0 25px;
    margin: 0 10px;
`;

export default NavBar;
