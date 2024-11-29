import styled from "styled-components";

export const UsersSection = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;
    margin: 4rem 0 0 0;
    justify-content: center;
`;
export const SingleUserCard = styled.div<{ backgroundImage?: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 100%;
    background: ${({ backgroundImage }) =>
        backgroundImage
            ? `url(${backgroundImage}) no-repeat center center`
            : "none"};
    background-size: cover;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(254, 255, 251, 0.9);
        z-index: 1;
        border-radius: inherit;
    }

    > * {
        position: relative;
        color: ${({ theme }) => theme.colors.background};
        z-index: 2;
    }

    > p {
        text-align: start;
        padding: 1rem 1rem 0 1rem;
    }
`;

export const FirstRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    > div {
        display: flex;
        align-items: end;
        gap: 0.5rem;
        > svg {
            fill: ${({ theme }) => theme.colors.primary};
            font-size: 1.5rem;
        }
    }
`;
export const SecondRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem 0 2rem;
`;
