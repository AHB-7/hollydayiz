import styled from "styled-components";
export const VenuesContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    @media screen and (${({ theme }) => theme.breakpoints.md}) {
        grid-template-columns: 100%;
    }
    padding: 4rem 1rem 1rem 1rem;
    background-color: ${({ theme }) => theme.colors.background};
`;
