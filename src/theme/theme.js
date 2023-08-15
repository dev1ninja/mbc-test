import { createTheme, alpha } from "@material-ui/core";
import { primary, black, white, inputBorderColor, textDisabled } from "./variables";

export default createTheme({
    typography: {
        allVariants: {
            fontFamily: "Poppins",
            fontWeight: '300',
            fontSize: "1.6rem"
        }
    },
    overrides: {
        MuiTypography: {
            root: {
                color: white
            }
        },
        MuiCheckbox: {
            root: {
                padding: "0",
                width: "2.2rem",
                height: "2.2rem",
                "& svg": {
                    fill: inputBorderColor,
                    width: "2.2rem",
                    height: "2.2rem"
                }
            }
        },
        MuiButton: {
            outlined: {
                border: `1px solid ${primary}`,
                minWidth: "22rem",
                height: "4.8rem",
                fontSize: "1.6rem",
                color: primary,
                textTransform: "none",
                "&:disabled": {
                    border: `1px solid ${primary}`,
                    cursor: "no-drop",
                    pointerEvents: "auto",
                    opacity: 0.2,
                    color: primary
                },
                "@media (max-width: 1200px)": {
                    minWidth: "17rem"
                }
            },
            contained: {
                fontSize: "1.6rem",
                minWidth: "22rem",
                overflow: "hidden",
                height: "4.8rem",
                borderRadius: ".4rem",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: primary,
                transition: "opacity .2s ease-in-out",
                "&:hover": {
                    backgroundColor: "#0CF8E9",
                    opacity: 0.8
                },
                "&:disabled": {
                    backgroundColor: "#124D5A",
                    color: black
                },
                "@media (max-width: 1200px)": {
                    minWidth: "17rem"
                },
                "@media (hover: none)": {
                    "&:hover": {
                        backgroundColor: `${primary} !important`,
                        opacity: 0.2,
                        color: black
                    }
                }
            }
        },
        MuiInput: {
            root: {
                border: `1px solid ${white}`,
                backgroundColor: alpha("#14142B", ".5")
            },
            input: {
                color: white,
                fontWeight: '300',
                "&::placeholder": {
                    color: white,
                    opacity: 0.4
                },
                "&$disabled": {
                    color: textDisabled
                }
            },
            underline: {
                "&:before": {
                    borderBottom: "none",
                    content: ""
                },
                "&:after": {
                    borderBottom: "none",
                    content: ""
                }
            }
        },
        MuiInputBase: {
            root: {
                fontWeight: '300',
                backgroundColor: "#14142B",
                paddingLeft: "12px",
                fontSize: "1.4rem",
                border: `1px solid ${white}`,
                color: white,
                width: "100%",
                height: "4.8rem",
                fontFamily: "Poppins",
                display: "flex",
                borderRadius: ".4rem",
                padding: ".5rem .6rem",
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: alpha("#14142B", ".25")
                }
            }
        }
    }
});
