import styled from "styled-components";
export const VenuesContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    @media screen and (max-width: 600px) {
        grid-template-columns: 100%;
    }
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.background};
`;
