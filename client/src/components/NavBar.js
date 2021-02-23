import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchContext } from './SearchContext';

import { IoIosFitness as FitnessLogo } from 'react-icons/io';
import { FaHeartbeat as MedicalLogo } from 'react-icons/fa';
import { BiRun as LifestyleLogo } from 'react-icons/bi';
import { SiNiconico as EntertainmentLogo } from 'react-icons/si';
import { MdPets as PetsLogo } from 'react-icons/md';
import { FaGamepad as GameLogo } from 'react-icons/fa';
import { FaIndustry as IndustrialLogo } from 'react-icons/fa';

const NavBar = () => {
  const {
    actions: { searchByCategory },
  } = React.useContext(SearchContext);

  return (
    <Wrapper>
      <Nav>
        <StyledLink
          to="/category/fitness"
          onClick={() => searchByCategory('fitness')}
        >
          <FitnessLogo className="categoryLogo" />
          Fitness
        </StyledLink>
        <StyledLink
          to="/category/medical"
          onClick={() => searchByCategory('medical')}
        >
          <MedicalLogo className="categoryLogo" />
          Medical
        </StyledLink>
        <StyledLink
          to="/category/lifestyle"
          onClick={() => searchByCategory('lifestyle')}
        >
          <LifestyleLogo className="categoryLogo" />
          Lifestyle
        </StyledLink>
        <StyledLink
          to="/category/entertainment"
          onClick={() => searchByCategory('entertainment')}
        >
          <EntertainmentLogo className="categoryLogo" />
          Entertainment
        </StyledLink>
        <StyledLink
          to="/category/pets-and-animals"
          onClick={() => searchByCategory('pets-and-animals')}
        >
          <PetsLogo className="categoryLogo" />
          Pets and Animals
        </StyledLink>
        <StyledLink
          to="/category/gaming"
          onClick={() => searchByCategory('gaming')}
        >
          <GameLogo className="categoryLogo" />
          Gaming
        </StyledLink>
        <StyledLink
          to="/category/industrial"
          onClick={() => searchByCategory('industrial')}
        >
          <IndustrialLogo className="categoryLogo" />
          Industrial
        </StyledLink>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 1px #828282 solid;
  border-bottom: 1px #b0b0b0 solid;
`;
const Nav = styled.nav`
  background-color: #dedede;
  padding: 13px 0;
  display: flex;
  justify-content: flex-start;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  /* border: solid 2px black; */
  padding: 0 25px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  font-size: 1.1em;

  .categoryLogo {
    font-size: 1.2em;
    margin: 0 5px;
  }
  &:hover {
    color: #62acb5;
  }
`;

export default NavBar;
