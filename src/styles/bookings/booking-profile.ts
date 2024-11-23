import styled from "styled-components";

export const BookingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 1rem;
    @media (max-width: 850px) {
        grid-template-columns: 1fr;
    }
    padding: 1rem;
`;
export const BookingCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
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
        fill: #ff6a74;
        :hover {
            fill: darkgrey;
        }
    }
`;
export const BookingCardImage = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 0.5rem;
    object-fit: cover;
    object-fit: cover;
`;
export const CardInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    width: 100%;
    gap: 1rem;
    > div > h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    > div > p {
        padding: 0.1rem 0;
    }
`;
export const ViewVenue = styled.div`
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    > a {
        color: black;
        transition: color 0.3s;
        &:hover {
            color: grey;
        }
    }
`;
export const GuestsNumber = styled.p`
    font-weight: bold;
`;
