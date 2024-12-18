import styled from "styled-components";

export const CheckboxWrapper = styled.div`
    padding: 0.5rem;
    --size: 50px;
    --shadow: calc(var(--size) * 0.07) calc(var(--size) * 0.1);

    * {
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }

    input[type="checkbox"] {
        display: none;
    }

    label {
        position: relative;
        display: block;
        width: var(--size);
        height: var(--size);
        margin: 0 auto;
        background-color: #f72414;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.2s ease transform, 0.2s ease background-color,
            0.2s ease box-shadow;
        overflow: hidden;
        z-index: 1;
    }

    label:before {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        width: calc(var(--size) * 0.7);
        height: calc(var(--size) * 0.7);
        margin: 0 auto;
        background-color: ${({ theme }) => theme.colors.text};
        transform: translateY(-50%);
        border-radius: 50%;
        transition: 0.2s ease width, 0.2s ease height;
    }

    label:hover:before {
        width: calc(var(--size) * 0.55);
        height: calc(var(--size) * 0.55);
    }

    label:active {
        transform: scale(0.9);
    }

    .tick_mark {
        position: absolute;
        top: -1px;
        right: 0;
        left: calc(var(--size) * -0.05);
        width: calc(var(--size) * 0.6);
        height: calc(var(--size) * 0.6);
        margin: 0 auto;
        margin-left: calc(var(--size) * 0.14);
        transform: rotateZ(-40deg);
    }

    .tick_mark:before,
    .tick_mark:after {
        content: "";
        position: absolute;
        background-color: #fff;
        border-radius: 2px;
        opacity: 0;
        transition: 0.2s ease transform, 0.2s ease opacity;
    }

    .tick_mark:before {
        left: 0;
        bottom: 0;
        width: calc(var(--size) * 0.1);
        height: calc(var(--size) * 0.3);
        transform: translateY(calc(var(--size) * -0.68));
    }

    .tick_mark:after {
        left: 0;
        bottom: 0;
        width: 100%;
        height: calc(var(--size) * 0.1);
        transform: translateX(calc(var(--size) * 0.78));
    }

    input[type="checkbox"]:checked + label {
        background-color: #07d410;
    }

    input[type="checkbox"]:checked + label:before {
        width: 0;
        height: 0;
    }

    input[type="checkbox"]:checked + label .tick_mark:before,
    input[type="checkbox"]:checked + label .tick_mark:after {
        transform: translate(0);
        opacity: 1;
    }
`;
export const Span = styled.span`
    display: block;
    margin-top: 1rem;
    font-size: 1.1rem;
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.colors.background};
`;

export const EditTextArea = styled.textarea`
    font-size: 1.1rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    width: 100%;
    min-height: 10rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    border: 0.05rem solid ${({ theme }) => theme.colors.text};
    margin: 0 auto 0.5rem auto;
    resize: vertical;
    ::placeholder {
        color: rgba(0, 0, 0, 0.5);
    }
`;
