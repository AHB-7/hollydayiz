import styled from "styled-components";

export const NavContainer = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 1200px;
`;
export const Navbar = styled.div`
    background-color: ${({ theme }) => theme.colors.text};
    position: absolute;
    padding: 0.5rem 0.7rem;
    border-radius: 1.2rem;
    width: calc(100% - 2rem);
    max-width: 1200px;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    overflow: auto;
`;

export const UpperNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const LowerNav = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 2.4rem;
    font-weight: 900;
    padding: 4rem 1rem 0.5rem 1rem;
    gap: 1rem;
    > * not(:last-child) {
        color: ${({ theme }) => theme.colors.background};
    }
    @media screen and (${({ theme }) => theme.breakpoints.md}) {
        padding: 2rem 0 0.5rem 0;
    }
`;

export const LogInContainer = styled.div`
    display: flex;
    background-color: transparent;
    border: none;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    transition: all 0.2s;
    &:hover {
        cursor: pointer;
        scale: 1.05;
    }
    > p {
        font-size: 1.3rem;
        color: ${({ theme }) => theme.colors.background};
    }
    > svg {
        font-size: 1.7rem;
    }
`;
