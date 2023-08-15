import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Button, Typography } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import sidebarContext from "context/sidebar/sidebarContext";
import "./SuccessWeb.scss";
import Navigations from "dashboard/components/navigations/Navigations";

const entryType = sessionStorage.getItem("type");
class SuccessWebPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    continueOnboarding = () => {
        const { history } = this.props;
        const { hasCompleted } = this.context;
        window.sessionStorage.setItem("steps", 3);
        hasCompleted(3);
        history.push("/admin/businessType");
    };

    render() {
        return (
            <Navigations>
                <form className="form-wrapper">
                    <Typography variant="h3" gutterBottom>
                        Great! That’s everything we need.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        We’re now ready to verify your identity.
                    </Typography>
                    <div className="steps-content">
                        <div className="things-to-do">
                            <ThumbUpAltOutlinedIcon className="thumb-icon" />{" "}
                            <p>Document uploaded. </p>
                        </div>
                        <div className="things-to-do">
                            <ThumbUpAltOutlinedIcon className="thumb-icon" />{" "}
                            <p>Selfie uploaded. </p>
                        </div>
                    </div>
                    <div className="things-to-do">
                        <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Selfie uploaded. </p>
                    </div>
                    <Button
                        type="button"
                        className="form-button inlineButton"
                        variant="contained"
                        onClick={this.continueOnboarding}
                    >
                        {entryType === "login" ? "Back" : "Continue onboarding"}
                    </Button>
                </form>
            </Navigations>
        );
    }
}

export default SuccessWebPage;

SuccessWebPage.contextType = sidebarContext;
SuccessWebPage.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
