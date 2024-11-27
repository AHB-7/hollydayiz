import styled from "styled-components";

export const SearchSortingContainer = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
        padding: 0.5rem;
        height: 100%;
        max-height: 4rem;
        font-size: 1.1rem;
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
    padding: 0.5rem;
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
`;
export const SortButton = styled.button`
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
        font-size: 1.1rem;
        transition: fill 0.3s;
    }

    &:hover > * {
        fill: ${({ theme }) => theme.colors.background};
        stroke: ${({ theme }) => theme.colors.background};
    }
`;
export const SortOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    height: 100%;
    min-height: 20rem;
    gap: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    position: absolute;
    top: 2.5rem;
    width: 100%;
    max-width: 32rem;
    min-width: 18rem;
    right: 0;
    z-index: 1;
    > label {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.background};
        padding-bottom: 0.5rem;
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
    fieldset {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.5rem;
        border: none;
        margin: 0;
        > legend {
            font-size: 1.2rem;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.background};
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
        > label {
            font-size: 1.1rem;
            color: ${({ theme }) => theme.colors.background};
            padding-left: 0.5rem;
        }
    }
`;
export const SearchResult = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`;
