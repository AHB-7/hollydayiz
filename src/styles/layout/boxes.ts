import styled, { keyframes } from "styled-components";

export const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #f44336;
    border-radius: 0.8rem;
    background-color: #ffebee;
    color: #d32f2f;
    font-size: 14px;
    font-weight: 500;
`;

export const ErrorIcon = styled.span`
    margin-right: 8px;
    font-size: 16px;
`;
export const l10 = keyframes`
  90%, 100% {
    transform: translate(300%);
  }
`;

export const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

export const Loader = styled.div`
    width: 40px;
    aspect-ratio: 1;
    padding: 5px;
    box-sizing: border-box;
    display: grid;
    background: #fff;
    filter: blur(4px) contrast(10);
    mix-blend-mode: darken;

    &::before,
    &::after {
        content: "";
        grid-area: 1 / 1;
        background: linear-gradient(#000 0 0) left,
            linear-gradient(#000 0 0) right;
        background-size: 10px 20px;
        background-origin: content-box;
        background-repeat: no-repeat;
    }

    &::after {
        height: 10px; /* Smaller circle */
        width: 10px;
        margin: auto 0;
        border-radius: 50%;
        background: #000;
        animation: ${l10} 1s infinite;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

export const Modal = styled.div`
    background-color: ${({ theme }) => theme.colors.text};
    padding: 2rem;
    border-radius: 0.5rem;
    width: 300px;
    text-align: center;
`;

export const Message = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.background};
`;

export const Actions = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
`;

export const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.dangerous};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }

    &:last-child {
        background-color: ${({ theme }) => theme.colors.primary};

        &:hover {
            background-color: #a71d2a;
        }
    }
`;
