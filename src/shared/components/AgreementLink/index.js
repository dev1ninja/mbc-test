import React from "react";
import { string } from "prop-types";
import { Box, Typography } from "@material-ui/core";
import classNames from "classnames";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import aggrementLink from "assets/images/aggrement-link.svg";

import { useStyles } from "./styles";

const AgreementLink = ({ title, link, className }) => {
    const styles = useStyles();

    return (
        <Box className={classNames([className, styles.reference])}>
            <Box className={styles.referenceDescription}>
                <Box className={styles.referenceSelect}>
                    <DescriptionOutlinedIcon className={styles.outlinedIcon} />
                    <a href={link} rel="noreferrer" target="_blank" className={styles.referenceLinkIcon}>
                        <Typography className={styles.referenceName}>{title}</Typography>
                    </a>
                </Box>
                <Box className={styles.referenceLinkEnter}>
                    <a href={link} rel="noreferrer" target="_blank" className={styles.referenceLinkIcon}>
                        <img
                            className={styles.referenceIcon}
                            src={aggrementLink}
                            alt="aggrementLink"
                        />
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default AgreementLink;

AgreementLink.propTypes = {
    title: string.isRequired,
    link: string.isRequired,
    className: string
};
