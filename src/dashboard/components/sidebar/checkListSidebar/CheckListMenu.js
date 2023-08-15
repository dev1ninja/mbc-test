import React from "react";
import { useStyles } from "dashboard/components/sidebar/styles";
import { Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import classNames from "classnames";
import registerLogo from "assets/images/registerLogo.svg";
import logoutIcon from "assets/images/logout.svg";
import { array, func } from "prop-types";
import { logout } from "auth/services/AuthService";
import { useHistory } from "react-router-dom";
import SvgIcon from "shared/components/SvgIcon";

const CheckListMenu = ({ homeItems, isActive }) => {
    const type = sessionStorage.getItem("type");
    const history = useHistory();
    const loginType = type === "login";
    const styles = useStyles();

    const handleLogout = async () => {
        await logout();
        sessionStorage.clear();
        localStorage.clear();
        history.push("/auth/login");
    };

    const handleClickItem = (e, id, item) => {
        isActive(e, id, item);
    };

    return (
        <>
            <div className={classNames([styles.logo, { [styles.loginLogo]: type }])}>
                <img src={registerLogo} alt="logo" />
            </div>
            <div className={styles.container}>
                {homeItems?.map(item => {
                    return (
                        <div
                            onClick={e => handleClickItem(e, item.id, item)}
                            className={classNames([
                                styles.itemContainer,
                                { [styles.activeItemContainer]: item.active },
                                { [styles.itemClickable]: type === "login" }
                            ])}
                            key={item.id}
                        >
                            <div className={styles.content}>
                                <Typography
                                    className={classNames([
                                        styles.itemText,
                                        { [styles.activeItemText]: !item.active }
                                    ])}
                                >
                                    {item.id}
                                </Typography>
                                <Typography
                                    className={classNames([
                                        styles.itemContent,
                                        { [styles.activeItemText]: !item.active }
                                    ])}
                                >
                                    {item.name}
                                </Typography>
                            </div>
                            {!item.hasCompleted && (
                                <div className={styles.icon}>
                                    <ErrorOutlineIcon className="error-icon" />
                                </div>
                            )}
                        </div>
                    );
                })}
                {loginType && (
                    <div className={styles.logoutWrapper} onClick={handleLogout}>
                        <SvgIcon className={styles.logoutLogo} iconPath={logoutIcon} />
                        <Typography className={styles.logoutText}>Logout</Typography>
                    </div>
                )}
            </div>
        </>
    );
};

export default CheckListMenu;

CheckListMenu.propTypes = {
    homeItems: array.isRequired,
    isActive: func.isRequired
};
