const baseTheme = {
    colors: {
        primary: "#2B699B",
        secondary: "#2ecc71",
        dangerous: "#FF0000",
    },
    breakpoints: {
        sm: "600px",
        md: "800px",
        lg: "1200px",
    },
};

export const lightTheme = {
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        background: "#E8EBF0",
        text: "#100F0F",
    },
};

export const darkTheme = {
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        background: "#100F0F",
        text: "#E8EBF0",
    },
};

export const theme = lightTheme;
