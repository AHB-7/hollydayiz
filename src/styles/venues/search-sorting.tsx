import styled from "styled-components";

export const SearchSortingContainer = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
    padding: 0 0.8rem;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
        padding: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        border: 0.05rem solid ${({ theme }) => theme.colors.text};
        outline: none;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: ${({ theme }) => theme.colors.text};
            color: ${({ theme }) => theme.colors.background};
        }
    }
`;
export const SearchInput = styled.input`
    width: 100%;
    font-size: 1.1rem;
    padding: 0.35rem;
    flex: 1;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    border: 0.05rem solid ${({ theme }) => theme.colors.text};
    border-right: none;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    width: 100%;
`;
export const SortingContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    > button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem;
        border-radius: 0.5rem;
        background: ${({ theme }) => theme.colors.background};
        border: 0.05rem solid ${({ theme }) => theme.colors.text};
        outline: none;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: ${({ theme }) => theme.colors.text};
        }

        > * {
            fill: ${({ theme }) => theme.colors.text};
            transition: fill 0.3s;
        }

        &:hover > * {
            fill: ${({ theme }) => theme.colors.background};
        }
    }
`;
export const SortOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 15rem;
    height: 100%;
    min-height: 18rem;
    gap: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    position: absolute;
    top: 2.5rem;
    right: 0;
    z-index: 1;
    > label {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.background};
        padding-bottom: 1rem;
    }
    background: ${({ theme }) => theme.colors.text};
    > * {
        color: ${({ theme }) => theme.colors.background};
    }
    > select {
        font-size: 1.1rem;
        padding: 0.35rem;
        background: ${({ theme }) => theme.colors.text};
        color: ${({ theme }) => theme.colors.background};
        padding: 0.5rem;
        > option {
            color: ${({ theme }) => theme.colors.background};
        }
        outline: none;
        width: 100%;
        border-radius: 0.5rem;
    }
    > button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        border: 0.05rem solid ${({ theme }) => theme.colors.text};
        outline: none;
        margin-top: 1rem;
    }
`;
