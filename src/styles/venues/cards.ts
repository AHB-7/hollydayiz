import styled from "styled-components";

export const VenueCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
    border-radius: 0.8rem;
    border: 0.01rem solid ${({ theme }) => theme.colors.text};
    position: relative;
`;
export const VenueInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    > h2 {
        font-size: 1.5rem;
        font-weight: 600;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex: 1;
    }
    > div > p {
        font-weight: 700;
        font-size: 1.1rem;
    }
    padding: 0.5rem;
    position: relative;
`;
export const OwnerNameImg = styled.div`
    display: flex;
    align-items: end;
    gap: 0.5rem;
    position: relative;
    transition: scale 0.1s;
    width: 100%;
    &:hover {
        scale: 1.01;
    }
    > img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
    }
    > p {
        padding-bottom: 0.5rem;
        font-size: 1.5rem;
        width: 100%;
        max-width: 12rem;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;
export const VenueImageContainer = styled.div`
    > a > img {
        cursor: pointer;
        width: 100%;
        min-height: 20rem;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        scale: 1;
        transition: scale 0.2s;
        &:hover {
            scale: 1.01;
        }
        border-radius: 0.8rem;
    }
    position: relative;
`;

export const StarsContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 1rem;
`;

export const VenueMetaContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
`;
export const VenueMeta = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0rem;
    > p {
        font-size: 1.3rem;
    }
    font-size: 1.5rem;
    border: 0.12rem solid ${({ theme }) => theme.colors.text};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.3rem;
`;

export const VenueBookingsButton = styled.button`
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 0.3rem;
    padding: 0.6rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    margin: 2rem 0 2rem 0;
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
    }
    &:active {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;
export const DisabledButton = styled.button`
    background-color: grey;
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 0.3rem;
    padding: 0.6rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    margin: 1rem 0;
`;
