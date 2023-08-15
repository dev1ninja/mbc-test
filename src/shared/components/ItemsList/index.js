import React, { Fragment } from "react";
import { Box, Typography } from "@material-ui/core";
import { array, func, string } from "prop-types";
import classNames from "classnames";
import infoIcon from "assets/images/info.svg";
import SvgIcon from "shared/components/SvgIcon";

import { useStyles } from "./styles";

const ItemsList = ({ title, items, labelKey, valueKey, className }) => {
    const styles = useStyles();

    const handleInfoIconClick = item => {
        item?.onInfoIconClick(item);
    };

    return (
        <Box className={classNames([className, styles.container])}>
            <Typography className={styles.title}>{title}</Typography>
            <ul className={styles.list}>
                {items.map(item => {
                    const ListItem = item?.hasInfo ? Box : Fragment;
                    const listItemProps = item?.hasInfo && { className: styles.infoItem };
                    return (
                        <ListItem key={item[valueKey]} {...listItemProps}>
                            <li className={styles.listItem}>
                                {item[labelKey]}
                            </li>
                            {item?.onInfoIconClick && item.hasInfo && (
                                <Box className={styles.infoIcon} onClick={() => handleInfoIconClick(item)}>
                                    <SvgIcon iconPath={infoIcon} />
                                </Box>
                            )}
                        </ListItem>
                    );
                })}
            </ul>
        </Box>
    );
};

export default ItemsList;

ItemsList.defaultProps = {
    labelKey: "label",
    valueKey: "id"
};

ItemsList.propTypes = {
    title: string,
    className: string,
    items: array.isRequired,
    onInfoIconClick: func,
    labelKey: string,
    valueKey: string
};
