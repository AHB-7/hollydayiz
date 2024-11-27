import React from "react";
import styled, { keyframes } from "styled-components";

const l10 = keyframes`
  90%, 100% {
    transform: translate(300%);
  }
`;

const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Loader = styled.div`
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

export const Loading: React.FC = () => {
    return (
        <LoaderContainer>
            <Loader />
        </LoaderContainer>
    );
};
