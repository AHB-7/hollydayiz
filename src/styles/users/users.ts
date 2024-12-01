import styled from "styled-components";

export const UsersSection = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1rem;
    padding: 4rem 1rem 0 1rem;
    justify-content: center;
    width: 100%;
    height: 9rem;
`;
export const SingleUserCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 1rem;
    align-items: start;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.text};
    border-radius: 1rem;
    transition: all 0.1s;
    position: relative;
    &:hover {
        scale: 1.02;
    }
`;

export const FirstRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.2rem;
    flex: 1;
    > p {
        font-size: 0.9rem;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
export const Manager = styled.p`
    position: absolute;
    bottom: 0rem;
    right: 0rem;
    font-weight: 700;
    padding: 0.4rem 0.4rem;
    border: 1px solid ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.text};
    border-right: none;
    border-bottom: none;
    border-bottom-right-radius: 1rem;
`;
export const IfManager = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    > h2 {
        font-size: 1.5rem;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 10rem;
        height: 3.5rem;
    }
`;
export const UserImage = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 1rem;
    object-fit: cover;
`;
export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    p {
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: wrap;
        width: 100%;
        max-width: 11rem;
    }
    > p {
        font-size: 1rem;
        font-weight: 500;
    }
`;
