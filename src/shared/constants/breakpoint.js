export default {
    down(size) {
        const breakpoint = {
            xs: "76.8rem",
            sm: "90rem",
            md: "102.4rem",
            lg: "124rem",
            xl: "138rem"
        };
        return `@media(max-width:${breakpoint[size]})`;
    },
    short(size) {
        const breakpoint = {
            sm: "36rem",
            md: "72rem",
            lg: "108rem"
        };
        return `@media(max-height:${breakpoint[size]})`;
    }
};
