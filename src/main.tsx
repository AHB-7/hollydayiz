import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global/global.style";
import { theme } from "./styles/global/theme";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <GlobalStyle />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
