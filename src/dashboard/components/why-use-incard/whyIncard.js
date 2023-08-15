import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import Navigations from "dashboard/components/navigations/Navigations";

import useToggle from "../../../shared/customhooks/useToggle";
import relationshipPurpose from "../../services/relationshipPurpose";

import useStyle from "./WhyStyles";

function WhyIncard() {
    const [isEnable, setButtonEnable] = useState(false);
    const [selectedLabels, setLabels] = useState([]);
    const [isChecked, setCheckbox] = useToggle({
        one: false,
        two: false,
        three: false,
        four: false
    });

    const { one, two, three, four } = isChecked;
    const classes = useStyle();
    const { push } = useHistory();

    const options = [
        {
            checked: one,
            name: "one",
            label: "Receive payments from customers"
        },
        {
            checked: two,
            name: "two",
            label: "Make daily purchases"
        },
        {
            checked: three,
            name: "three",
            label: "Pay suppliers"
        },
        {
            checked: four,
            name: "four",
            label: "Pay utility bills"
        }
    ];

    useEffect(() => {
        const activeLabels = options.map(field => {
            if (field.checked) return field.label;
            return false;
        });
        setLabels(activeLabels.filter(l => l));

        setButtonEnable([one, two, three, four].filter(checked => checked).length >= 1);

        /*eslint-disable*/
    }, [isChecked]);

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await relationshipPurpose(selectedLabels);
        if (response) push("/admin/types-of-customer");
    };

    return (
        <Navigations>
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <Typography variant="h3">Why using incard for your business ?</Typography>
                <FormGroup classes={{ root: classes.formGroup }}>
                    {options.map(field => (
                        <FormControlLabel
                            key={field.name}
                            value="top"
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

export default WhyIncard;
