import React from "react";
import { Grid, Button } from "@material-ui/core";
import "./Header.scss";
import logo from "assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

export default function Header() {
    const history = useHistory();

    const handleLogout = () => {
        sessionStorage.clear();
        history.push("/auth/login");
    };

    const type = sessionStorage.getItem("type");
    return (
        <div className="header">
            <nav className="navbar">
                <Grid item xs={5} className="header-logo">
                    <a href="/" className="logo">
                        <img src={logo} alt="logo" />
                    </a>
                </Grid>
                <Grid item xs={2} className="header-menu">
                    <Button className="back-button" onClick={() => history.goBack()} variant="text">
                        <KeyboardBackspaceIcon /> back
                    </Button>
                </Grid>
                <Grid item xs={5} className="header-menu">
                    <ul className="main-nav" id="js-menu">
                        {type === "login" ? (
                            <li>
                                <Button
                                    color="default"
                                    className="form-button inlineButton logout-btn"
                                    variant="contained"
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                </Grid>
            </nav>
        </div>
    );
}
