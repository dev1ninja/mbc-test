import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@material-ui/core";

import Navigations from "dashboard/components/navigations/Navigations";
import useStyle from "../why-use-incard/WhyStyles";
import makeStyle from "./OtherStyles";

import useInput from "../../../shared/customhooks/useInput";
import useToggle from "../../../shared/customhooks/useToggle";
import customerSpecification from "../../services/customerSpecification";

function CustomerType() {
    const [isEnable, setButtonEnable] = useState(false);
    const [selectedTypes, setCustomerTypes] = useState([]);
    const [state, setCustomerState, resetInput] = useInput({ other: "" });
    const [isChecked, setCheckbox] = useToggle({
        one: false,
        two: false,
        three: false,
        four: false,
        other: false
    });

    const { one, two, three, four, other } = isChecked;
    const classes = useStyle();
    const style = makeStyle();
    const { push } = useHistory();

    const options = [
        {
            name: "one",
            key: 1,
            checked: one,
            label: "Charities or religious groups"
        },
        {
            name: "two",
            key: 2,
            checked: two,
            label: "Individuals - Consumers"
        },
        {
            name: "three",
            key: 3,
            checked: three,
            label: "Businesses"
        },
        {
            name: "four",
            key: 4,
            checked: four,
            label: "Government entities"
        }
    ];

    useEffect(() => {
        const activeLabels = options.map(field => {
            if (field.checked) return field.key;
            return false;
        });
        setCustomerTypes(activeLabels.filter(l => l));

        const multiSelect = [one, two, three, four].filter(checked => checked).length >= 1;
        const typeOther = other && state.other.trim() !== "";

        if (multiSelect) {
            if (other && state.other.trim() === "") setButtonEnable(false);
            else setButtonEnable(true);
        } else if (typeOther) setButtonEnable(true);
        else setButtonEnable(false);
        /*eslint-disable*/
    }, [isChecked, state.other]);

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await customerSpecification(selectedTypes, other, state.other.trim());

        if (response.status === 200) {
            push("/admin/product-specification");
            resetInput();
        }
    };

    return (
        <Navigations>
            <form className="form-wrapper" onSubmit={handleSubmit} autoComplete="off">
                <Typography variant="h3">What type of customer are you dealing with?</Typography>

                {/* options */}
                <FormGroup classes={{ root: classes.formGroup }}>
                    {options.map(field => (
                        <FormControlLabel
                            key={field.key}
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={field.checked}
                                    onChange={e => setCheckbox(e)}
                                    name={field.name}
                                    classes={{
                                        root: classes.checkbox
                                    }}
                                />
                            }
                            label={field.label}
                            labelPlacement="start"
                            classes={{
                                labelPlacementStart: `${classes.labelPosition} ${field.checked &&
                                    classes.selectedOption}`,
                                label: classes.formLabel
                            }}
                        />
                    ))}

                    {/* if other type of customer */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                checked={other}
                                onChange={e => setCheckbox(e)}
                                name="other"
                                classes={{
                                    root: classes.checkbox
                                }}
                            />
                        }
                        label="Other"
                        labelPlacement="start"
                        classes={{
                            labelPlacementStart: `${style.labelPosition} ${other &&
                                style.selectedOption}`,
                            label: classes.formLabel
                        }}
                    />
                    <input
                        type="text"
                        name="other"
                        value={state.other}
                        onChange={setCustomerState}
                        className={`${style.textInput} ${
                            !other ? style.disableInput : style.outlineInput
                        }`}
                        disabled={!other}
                        placeholder="type of customer"
                    />
                </FormGroup>

                {/* submit button */}
                <Button
                    type="submit"
                    disabled={!isEnable}
                    className="form-button"
                    variant="contained"
                >
                    Continue
                </Button>
            </form>
        </Navigations>
    );
}

export default CustomerType;
