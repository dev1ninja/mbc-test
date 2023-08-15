/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Divider,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import Navigations from "dashboard/components/navigations/Navigations";
import getQuestion from "../../services/stakeholdership/getQuestion";
import addStakeholdership from "../../services/stakeholdership/addStakeholdership";
import useStyle from "./ShStyles";

function HistoricalSH() {
    const classes = useStyle();
    const [isAllAnswersNo, setAllNo] = useState(false);
    const [allHistoricalQuestions, setQuestionsData] = useState([]);
    const [isEnable, setButtonEnable] = useState(false);
    const { push } = useHistory();

    useEffect(() => {
        const validAnswers = allHistoricalQuestions.map(q => {
            if (q.selectedAnswer === "0") return true;
            // mandatory text field
            if (q.selectedAnswer === "1" && q.description.trim() !== "") return true;

            return false;
        });

        // check if all conditions passes
        const isValid = validAnswers.length && validAnswers.every(a => a === true);

        if (isValid) setButtonEnable(true);
        else setButtonEnable(false);
    }, [allHistoricalQuestions]);

    const radioButtons = [
        // integer value don't work in RadioGroup
        {
            label: "Yes",
            value: "1"
        },
        {
            label: "No",
            value: "0"
        }
    ];

    const makeListItemsArray = responseData => {
        // preparing array of list items with certain properties
        const allQuestions = responseData.map((item, index) => {
            return {
                // eslint-disable-next-line no-underscore-dangle
                questionId: item._id,
                question: `${index + 1}. ${item.questionValue}`,
                radioName: `ans${index + 1}`,
                selectedAnswer: "",
                name: `desc${index + 1}`,
                description: ""
            };
        });

        setQuestionsData(allQuestions);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getQuestion();
            res.data && makeListItemsArray(res.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        // making objects as required
        const sendAnswersArray = allHistoricalQuestions.map(q =>
            q.selectedAnswer === "0"
                ? {
                      questionId: q.questionId,
                      selectedAnswer: Number(q.selectedAnswer)
                  }
                : {
                      questionId: q.questionId,
                      selectedAnswer: Number(q.selectedAnswer),
                      description: q.description.trim()
                  }
        );

        // axios request
        const response = await addStakeholdership(sendAnswersArray);
        if (response.status === 200) {
            setAllNo(false);
            setQuestionsData([]);
            push("/admin/upload-docs");
        }
        setButtonEnable(false);
    };

    const handleRadioChange = event => {
        const { name, value } = event.target;
        const newArr = allHistoricalQuestions.map(h =>
            h.radioName === name ? { ...h, selectedAnswer: value } : h
        );
        setAllNo(false);
        setQuestionsData(newArr);
    };

    const setAllAnsNo = () => {
        setAllNo(true);
        const newArr = allHistoricalQuestions.map(q => ({ ...q, selectedAnswer: "0" }));
        setQuestionsData(newArr);
    };

    const handleDescriptionChange = event => {
        const { name, value } = event.target;
        const newArr = allHistoricalQuestions.map(h =>
            h.name === name ? { ...h, description: value } : h
        );
        setQuestionsData(newArr);
    };

    const printListItems = allHistoricalQuestions.length ? (
        // list items
        allHistoricalQuestions.map(item => (
            <ListItem key={item.questionId} classes={{ secondaryAction: classes.listItemActions }}>
                <ListItemText primary={item.question} classes={{ root: classes.questionText }} />

                {/* here goes radio buttons and text field */}
                <ListItemSecondaryAction classes={{ root: classes.listAction }}>
                    <RadioGroup
                        classes={{ root: classes.radioGroup }}
                        name={item.radioName}
                        value={item.selectedAnswer}
                        onChange={e => handleRadioChange(e)}
                    >
                        {radioButtons.map(r => (
                            <FormControlLabel
                                key={r.label}
                                value={r.value}
                                label={r.label}
                                control={
                                    <Radio
                                        color="default"
                                        classes={{
                                            root: classes.radioButton,
                                            checked: classes.checkedRadio
                                        }}
                                    />
                                }
                                classes={{
                                    label:
                                        item.selectedAnswer === r.value
                                            ? classes.activeLabel
                                            : classes.actionLabel
                                }}
                            />
                        ))}
                    </RadioGroup>
                    {/* if 'Yes' selected,add description */}
                    {item.selectedAnswer === "1" && (
                        <textarea
                            type="text"
                            name={item.name}
                            placeholder="Please provide us with more information*"
                            rows="5"
                            value={item.description}
                            onChange={e => handleDescriptionChange(e)}
                            className={classes.answerDescription}
                        />
                    )}
                </ListItemSecondaryAction>
            </ListItem>
        ))
    ) : (
        <ListItem>Unable to fetch Questions!!</ListItem>
    );

    return (
        <Navigations>
            <form className={`form-wrapper ${classes.staticForm}`} onSubmit={handleSubmit}>
                {/* form heading */}
                <Typography variant="h3" className={classes.heading}>
                    Tell us more about your history.
                    <FormControlLabel
                        checked={isAllAnswersNo}
                        value="end"
                        onChange={setAllAnsNo}
                        control={
                            <Radio
                                color="default"
                                classes={{
                                    root: classes.radioButton,
                                    checked: classes.checkedRadio
                                }}
                            />
                        }
                        label="Select ‘NO’ for all"
                        classes={{
                            label: isAllAnswersNo ? classes.activeLabel : classes.actionLabel
                        }}
                    />
                </Typography>

                <div className={classes.scrollableForm} style={{ minHeight: "50%", height: "60%" }}>
                    {/* list info */}
                    <Typography variant="h4" style={{ fontWeight: "700" }}>
                        Have you, a company of which you are or were a director, a company of which
                        you are or were involved in the management, or a company of which you are or
                        were a substantial shareholder:
                    </Typography>
                    <Divider variant="middle" classes={{ root: classes.divider }} />

                    {/* list items goes here */}
                    <List classes={{ root: classes.listContainer }}>{printListItems}</List>
                </div>

                <Button
                    type="submit"
                    className="form-button"
                    disabled={!isEnable}
                    variant="contained"
                    style={{ marginTop: "2rem" }}
                >
                    Continue
                </Button>
            </form>
        </Navigations>
    );
}

export default HistoricalSH;
