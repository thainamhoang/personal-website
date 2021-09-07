import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';

const StyledBackdrop = styled('div')`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
    transition: all 0.3s ease-in-out;
    display: ${({ open }) => (open ? 'block' : 'none')};
    
    @media (min-width: (min-width: ${dimensions.maxwidthDesktop}px) {
        display: none;
    }
`;

const StyledContainer = styled('div')`
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    outline: 0;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
   
    @media (min-width: (min-width: ${dimensions.maxwidthDesktop}px) {
        display: none;
    }
`;

const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
    height: 100vh;
    width: 55%;
    text-align: left;
    padding: 2rem;
    position: relative;
    right: 0;
    margin-left: auto;
    a {
        color: ${colors.text};
    }
    .nav-link {
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        padding: 1.5rem 0;
    }
`;

const Sidebar = ({ open, setOpen }) => {
    return (
        <>
            <StyledContainer
                open={open}
                aria-hidden={!open}
                tabIndex={open ? 1 : -1}
            >
                <StyledNav>
                    <a
                        className="nav-link"
                        href="https://drive.google.com/file/d/1LTBaEzoxGiRt5p8cDwg4QmWwojLBEdDH/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Résumé
                    </a>
                    <Link
                        className="nav-link"
                        to="/project"
                        onClick={() => setOpen(!open)}
                    >
                        Project
                    </Link>
                    <Link
                        className="nav-link"
                        to="/list-100"
                        onClick={() => setOpen(!open)}
                    >
                        List 100
                    </Link>
                </StyledNav>
            </StyledContainer>
            <StyledBackdrop open={open} />
        </>
    );
};

export default Sidebar;
