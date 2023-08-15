import { func, string } from "prop-types";
import React from "react";
import classNames from "classnames";
import { Typography } from "@material-ui/core";
import SvgIcon from "../SvgIcon";
import { useStyles } from "./styles";
import arrow from "../../../assets/images/arrow.svg";

const BackButtonLayout = ({ onClick, titleText, subtitleText }) => {
    const styles = useStyles();

    return (
        <>
            <div className={classNames([styles.container, styles.backButton])} onClick={onClick}>
                <SvgIcon className={styles.icon} iconPath={arrow} />
                <div className={styles.buttonContent}>Back</div>
            </div>
            {titleText && <Typography className={styles.title}>{titleText}</Typography>}
            {subtitleText && <Typography className={styles.subtitle}>{subtitleText}</Typography>}
        </>
    );
};

export default BackButtonLayout;

BackButtonLayout.defaultProps = {
    subtitleText: '',
    titleText: '',
    onClick: () => {},
}

BackButtonLayout.propTypes = {
    onClick: func,
    titleText: string,
    subtitleText: string
};
