import styled from "styled-components";

export const Navbar = styled.nav`
    background-color: ${({ theme }) => theme.colors.text};
    width: 100%;
    max-width: 25rem;
    padding: 0.5rem 0.7rem;
    max-width: 100%;
    position: absolute;
    margin: 0 auto;
    border-radius: 1.2rem;
    top: 0.5rem;
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
    padding: 1rem;
    gap: 1rem;
    > * {
        color: ${({ theme }) => theme.colors.background};
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
