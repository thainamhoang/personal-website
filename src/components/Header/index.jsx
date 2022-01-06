import React, { useState } from 'react';
import { Link } from 'gatsby';
import Sidebar from '../Sidebar';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import Logo from 'components/Logo';
import { deepMemo } from 'utils';

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
  grid-template-columns: repeat(3, auto);
  grid-gap: 3em;
  justify-content: flex-end;
  width: 100%;
  max-width: 350px;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    display: none;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    display: none;
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
      transition: background 200ms ease-in-out;
    }

    &.Link--is-active {
      color: ${colors.blue600};
      transition: background 200ms ease-in-out;
    }
  }
`;

const StyledBurger = styled.button`
    z-index: 12;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:focus {
        outline: none;
    }

    @media (min-width: ${dimensions.maxwidthDesktop}px) {
        display: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background: ${colors.text};
        border-radius: 0.625rem;
        transition: all 0.3s ease-in-out;
        position: relative;
        transform-origin: 1px;

        :first-child {
            background: ${colors.text};
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
        }

        :nth-child(2) {
            background: #141414bf;
            opacity: ${({ open }) => (open ? '0' : '1')};
            transform: ${({ open }) =>
                open ? 'translateX(20px)' : 'translateX(0)'};
        }

        :nth-child(3) {
            background: #1b1b1b;
            opacity: 0.65;
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`;

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <HeaderContainer>
            <HeaderContent>
                <Link to="/">
                    <Logo />
                </Link>
                <HeaderLinks>
                    <a
                        href="bit.ly/3zOxLtY"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Résumé
                    </a>
                    <Link activeClassName="Link--is-active" to="/project">
                        Project
                    </Link>
                    <Link activeClassName="Link--is-active" to="/list-100">
                        List 100
                    </Link>
                </HeaderLinks>
                <>
                    <StyledBurger
                        aria-controls="sidebar"
                        open={open}
                        onClick={() => setOpen(!open)}
                    >
                        <div />
                        <div />
                        <div />
                    </StyledBurger>
                    <Sidebar id="sidebar" open={open} setOpen={setOpen} />
                </>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default deepMemo(Header);
