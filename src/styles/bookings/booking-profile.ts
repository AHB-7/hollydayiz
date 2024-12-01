import styled from "styled-components";

export const BookingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    max-width: 1200px;
    gap: 1rem;
    @media (max-width: 850px) {
        grid-template-columns: 1fr;
        padding: 0 0.5rem;
    }
    > h2 {
        grid-column: 1 / -1;
    }
    padding: 0.5rem 0;
    padding-bottom: 3rem;
`;
export const BookingCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    position: relative;
`;

export const BookingDelete = styled.p`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
    > svg {
        font-size: 1.5rem;
        fill: ${({ theme }) => theme.colors.dangerous};
        :hover {
            fill: darkgrey;
        }
    }
`;
export const BookingCardImage = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 0.8rem;
    object-fit: cover;
`;
export const CardInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 1rem;
    > div {
        flex: 1;
    }
    > div > h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        padding-right: 1rem;
    }
`;
export const PastDate = styled.span`
    color: ${({ theme }) => theme.colors.dangerous};
    font-weight: bold;
`;

export const NormalDate = styled.span`
    color: inherit;
`;
export const ViewVenue = styled.div`
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    > a {
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.background};
        padding: 0.5rem 1rem;
        border-radius: 0.8rem;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background-color: ${(props) => props.theme.colors.primary};
        }
    }
`;
export const GuestsNumber = styled.p`
    font-weight: bold;
`;
export const EditContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    > span {
        font-size: 1.2rem;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.dangerous};
    }
    > p {
        font-size: 1.2rem;
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.background};
        transition: all 0.3s;
        padding: 0.5rem 2rem;
        border-radius: 0.8rem;
        &:hover {
            background-color: ${(props) => props.theme.colors.primary};
        }
    }
`;
