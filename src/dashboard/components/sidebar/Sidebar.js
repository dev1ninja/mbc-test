import React, { useCallback, useContext, useEffect, useMemo } from "react";
import classNames from "classnames";
import registerLogo from "assets/images/registerLogo.svg";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import authContext from "context/auth/authContext";
import { logout } from "auth/services/AuthService";
import logoutIcon from "assets/images/logout.svg";
import SvgIcon from "shared/components/SvgIcon";
import sidebarContext from "context/sidebar/sidebarContext";
import { useStyles } from "./styles";

const Sidebar = () => {
    const styles = useStyles();
    const history = useHistory();
    const type = sessionStorage.getItem("type");
    const loginType = type === "login";
    const { sidebar, isActive, hasCompleted } = useContext(sidebarContext);
    const { setUser } = useContext(authContext);

    const handleActive = useCallback(
        async id => {
            await isActive(id);
        },
        [isActive]
    );

    const initData = useCallback(async () => {
        const steps = sessionStorage.getItem("steps");
        if (!steps && loginType) {
            await handleActive(1);
        } else if (steps < 5) {
            hasCompleted(+steps);
        }
    }, [handleActive, hasCompleted]);

    useEffect(() => {
        initData();
    }, []);

    const homeItems = useMemo(() => {
        const menuItems = sidebar.HomeMenuItems;
        const hasActiveItem = menuItems.some(({ active }) => active);
        if (!hasActiveItem) {
            const result = menuItems.map((item, index) => {
                const isFirstItem = index === 0;
                if (isFirstItem) {
                    return {
                        ...item,
                        hasCompleted: false,
                        active: true
                    };
                }
                return item;
            });
            return result;
        }
        return menuItems;
    }, [sidebar.HomeMenuItems]);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        sessionStorage.clear();
        history.push("/auth/login");
    };

    return (
        <>
            <div className={classNames([styles.logo, { [styles.loginLogo]: type }])}>
                <img src={registerLogo} alt="logo" />
            </div>
            <div className={styles.container}>
                {homeItems.map(item => {
                    return (
                        <div
                            className={classNames([
                                styles.itemContainer,
                                { [styles.activeItemContainer]: item.active }
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

export default Sidebar;
