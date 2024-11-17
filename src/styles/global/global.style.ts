import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors.text};
  }
  h2{
  font-size: 2rem;
  }
  body {
    position: relative;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    max-width: ${(props) => props.theme.breakpoints.lg};
    margin: 0 auto;
    font-family: 'Noto Sans', sans-serif;
  }

  a {
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: none;
  }
  colors{
  primary: "#2B699B",
  secondary: "#2ecc71",
  dangerous: "#FF0000",
  text: #100F0F,
  background: #E8EBF0,
  }
`;
