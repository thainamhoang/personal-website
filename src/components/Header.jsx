import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import Logo from 'components/_ui/Logo';

const HeaderContainer = styled('div')`
  padding-top: 3.75em;
  padding-bottom: 3em;
`;

const HeaderContent = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const HeaderLinks = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 3em;
  justify-content: flex-end;
  width: 100%;
  max-width: 200px;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    grid-gap: 3em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-gap: 1em;
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    font-weight: 700;
    font-size: 1.4em;
    height: 100%;
    margin-bottom: -0.25em
    display: block;
    position: relative;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
      font-size: 0.95em;
    }

    &:hover {
      color: ${colors.blue600};
      transition: background 100ms ease-in-out;
    }

    &.Link--is-active {
      color: ${colors.blue600};
      transition: 100ms ease-in-out background;
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <Link to="/">
        <Logo />
      </Link>{' '}
      <HeaderLinks>
        <a
          href="https://drive.google.com/file/d/1LTBaEzoxGiRt5p8cDwg4QmWwojLBEdDH/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          CV
        </a>
        <Link activeClassName="Link--is-active" to="/project">
          Project
        </Link>
        {/* <Link activeClassName="Link--is-active" to="/blog">
          Blog
        </Link> */}
      </HeaderLinks>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
