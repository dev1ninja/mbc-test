import React from "react";
import { Typography, Box } from "@material-ui/core";
import logo from "assets/images/logo.png";
import LoginLayout from "shared/layouts/LoginLayout";
import { node, string } from "prop-types";
import { useStyles } from "./styles";

const DefaultLoginTemplate = ({ children, title, subtitle }) => {
    const styles = useStyles();

    return (
        <LoginLayout>
            <Box className={styles.container}>
                <img className={styles.logo} src={logo} alt="logo" />
                {title && <Typography className={styles.title}>{title}</Typography>}
                {subtitle && <Typography className={styles.subtitle}>{subtitle}</Typography>}
                {children}
            </Box>
        </LoginLayout>
    );
};

export default DefaultLoginTemplate;

DefaultLoginTemplate.defaultProps = {
    title: "",
    subtitle: ""
};

DefaultLoginTemplate.propTypes = {
    children: node.isRequired,
    title: string,
    subtitle: string
};
