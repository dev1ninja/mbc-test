import React, { Component } from "react";
import {
    Typography,
    Radio,
    TextField,
    InputAdornment,
    FormControlLabel,
    Button
} from "@material-ui/core";
import ReactRouterPropTypes from "react-router-prop-types";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import { getUser } from "shared/services/CommonService";
import sidebarContext from "context/sidebar/sidebarContext";
import "./CheckShareholder.scss";

export default class CheckShareholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
            percOfVotingRightsOrShares: null
        };
    }

    // logic for only one checkbox should be selected
    handleChange = (field, value) => {
        if (field === "yes") {
            this.setState({ select: 1 });
        } else if (field === "no") {
            this.setState({ select: 2 });
        } else if (field === "percOfVotingRightsOrShares") {
            this.setState({ percOfVotingRightsOrShares: value });
        }
    };

    // Submitting the data and calling API
    submit = async () => {
        const { history } = this.props;
        const { select, percOfVotingRightsOrShares } = this.state;
        if (select === 1) {
            const user = getUser();
            const res = await postBusinessApi("shareholders", {
                shareholders: [
                    {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        aliasesNames: user.aliasName,
                        email: user.email,
                        countryCode: user.countryCode,
                        phoneNumber: user.phoneNumber.toString(),
                        percOfVotingRightsOrShares
                    }
                ]
            });
            if (res.status && parseInt(percOfVotingRightsOrShares, 10) === 100) {
                const { hasCompleted } = this.context;
                sessionStorage.setItem("steps", 4);
                hasCompleted(4);
                history.push("/admin/general-agreement");
                return;
            }
        }
        history.push("/admin/shareholders");
    };

    render() {
        const { select, percOfVotingRightsOrShares } = this.state;
        return (
            <form className="form-wrapper">
                <Typography variant="h3" gutterBottom>
                    Are you a Shareholder in the company?
                </Typography>
                <div className={`form-field py10 ${select === 1 ? "selected" : ""}`}>
                    <FormControlLabel
                        label={
                            <div>
                                <div gutterBottom className="title3">
                                    Yes
                                </div>
                                <div className="shareHolderBind">
                                    <div className="textlabel">
                                        Please enter your percentage of voting rights or shares
                                    </div>
                                    <div className="shareHolderWrapper">
                                        <TextField
                                            className="form-field-input percOfVotingRightsOrShares"
                                            variant="outlined"
                                            value={percOfVotingRightsOrShares}
                                            type="number"
                                            name="percOfVotingRightsOrShares"
                                            onChange={e =>
                                                this.handleChange(
                                                    "percOfVotingRightsOrShares",
                                                    e.target.value
                                                )
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <h5>%</h5>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        control={
                            <Radio
                                checked={select === 1}
                                onChange={() => this.handleChange("yes")}
                            />
                        }
                        labelPlacement="start"
                    />
                </div>
                <div className={`form-field ${select === 2 ? "selected" : ""}`}>
                    <FormControlLabel
                        label="No"
                        control={
                            <Radio
                                checked={select === 2}
                                onChange={() => this.handleChange("no")}
                            />
                        }
                        labelPlacement="start"
                    />
                </div>
                {/* <div className="form-field disabled">
                    <FormControlLabel label="Individual" control={<span>Coming soon</span>} labelPlacement="start" />
                </div> */}
                <Button
                    className="form-button"
                    variant="contained"
                    color="default"
                    disabled={
                        !select ||
                        (select === 1 &&
                            !percOfVotingRightsOrShares &&
                            percOfVotingRightsOrShares <= 100)
                    }
                    onClick={this.submit}
                >
                    Continue
                </Button>
            </form>
        );
    }
}
CheckShareholder.contextType = sidebarContext;
CheckShareholder.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
