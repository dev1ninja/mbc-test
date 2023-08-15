import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Slider, Typography } from "@material-ui/core";
import Navigations from "dashboard/components/navigations/Navigations";
import { NUMBER } from "../../../shared/helpers/validations/PatternConstants";
import useStyles from "./AmtStyle";

import amountSpecification from "../../services/amountSpecification";

function ExpectedAmount() {
    const classes = useStyles();
    const [isEnable, setButtonEnable] = useState(false);
    const country = window.localStorage.getItem("countryName");

    const { push } = useHistory();

    const moneyMovementMarks = [
        {
            value: 1,
            label: "< GBP 1,000"
        },
        {
            value: 2,
            label: `GBP 1,000 - GBP 10,000`
        },
        {
            value: 3,
            label: "GBP 10,000 - GBP 100,000"
        },
        {
            value: 4,
            label: "> GBP 100,000"
        }
    ];

    const transactionVolumeMarks = [
        {
            value: 1,
            label: "< 10"
        },
        {
            value: 2,
            label: "10 - 49"
        },
        {
            value: 3,
            label: "50 - 99"
        },
        {
            value: 4,
            label: "100 - 499"
        },
        {
            value: 5,
            label: "> 500"
        }
    ];

    const [state, setState] = useState({
        expectedAmtMoneyMovementPerMonth: moneyMovementMarks[0].label,
        expectedTransactionVolPerMonth: transactionVolumeMarks[0].label,
        maximumSingleAmt: ""
    });
    // destructuring state
    const { maximumSingleAmt } = state;

    useEffect(() => {
        if (NUMBER.test(maximumSingleAmt))
            //  it's a num of min length 1 and max 10
            setButtonEnable(true);
        else setButtonEnable(false);
    }, [maximumSingleAmt]);

    const handleSubmit = async event => {
        event.preventDefault();
        const currency = country === "United Kingdom" ? "GBP" : "EUR";

        // axios request
        const response = await amountSpecification(state, currency);
        if (response.statusText === "OK") push("/admin/stakeholdership");
    };

    const handleMoneyMovement = (e, val) => {
        let newExpectedMovement;
        moneyMovementMarks.forEach(mark => {
            if (mark.value === val) {
                newExpectedMovement = mark.label;
            }

            setState({ ...state, expectedAmtMoneyMovementPerMonth: newExpectedMovement });
        });
    };

    const handleTransactionVolume = (e, val) => {
        let newExpectedTransaction;
        transactionVolumeMarks.forEach(mark => {
            if (mark.value === val) {
                newExpectedTransaction = mark.label;
            }

            setState({ ...state, expectedTransactionVolPerMonth: newExpectedTransaction });
        });
    };

    const handleMaxPayment = event => {
        const { value } = event.target;
        setState({ ...state, maximumSingleAmt: value });
    };

    return (
        <Navigations>
            <form className="form-wrapper" autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h3">Expected amount of money movement per month:</Typography>
                <Slider
                    defaultValue={1}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="off"
                    marks={moneyMovementMarks}
                    min={0.8}
                    max={4.2}
                    onChange={handleMoneyMovement}
                    classes={{
                        root: classes.slider,
                        rail: classes.sliderRail,
                        track: classes.sliderTrack,
                        thumb: classes.thumb,
                        mark: classes.mark,
                        markActive: classes.markActive,
                        markLabel: classes.markLabel
                    }}
                />

                <Typography variant="h3">Expected transaction volume per month:</Typography>
                <Slider
                    defaultValue={1}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="off"
                    marks={transactionVolumeMarks}
                    min={0.9}
                    max={5.1}
                    onChange={handleTransactionVolume}
                    classes={{
                        root: classes.slider,
                        rail: classes.sliderRail,
                        track: classes.sliderTrack,
                        thumb: classes.thumb,
                        mark: classes.mark,
                        markActive: classes.markActive,
                        markLabel: classes.markLabel
                    }}
                />

                <Typography variant="h3">Maximum single payment:</Typography>
                <Input
                    type="number"
                    placeholder="GBP"
                    variant="outlined"
                    value={maximumSingleAmt}
                    onChange={handleMaxPayment}
                    // override global styles(App.scss)
                    style={{
                        maxWidth: "12rem",
                        padding: ".6rem 1rem",
                        color: "#fff",
                        display: "block"
                    }}
                />

                <Button
                    type="submit"
                    className="form-button"
                    disabled={!isEnable}
                    variant="contained"
                >
                    Continue
                </Button>
            </form>
        </Navigations>
    );
}

export default ExpectedAmount;
