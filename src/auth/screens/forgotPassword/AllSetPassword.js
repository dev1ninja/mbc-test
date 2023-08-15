import React from "react";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AllSetPassword = () => {
    const { replace } = useHistory();
    const navigateToLogin = () => {
        replace("/auth/login");
    };
    return (
        <form className="form-wrapper">
            <Typography variant="h3"> All set!</Typography>
            <Typography
                style={{
                    marginBottom: ".5rem",
                    fontSize: "1.5rem"
                }}
                variant="subtitle2"
            >
                Your password has been succesfully reset. You can now log in to your app using the
                new password that you have created.
            </Typography>
            <Button
                className="form-button"
                variant="contained"
                color="default"
                onClick={navigateToLogin}
            >
                Log in
            </Button>
        </form>
    );
};
export default AllSetPassword;
