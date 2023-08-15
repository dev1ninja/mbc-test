import React, { useContext, useMemo } from "react";
import sidebarContext from "context/sidebar/sidebarContext";
import registerLogo from "assets/images/registerLogo.svg";

import "./styles.scss";
import classNames from "classnames";
import { array, func } from "prop-types";

const TabletSidebar = ({ homeItems, isActive }) => {
    const type = sessionStorage.getItem("type");
    const loginType = type === "login";
    const { sidebar } = useContext(sidebarContext);
    const { HomeMenuItems } = sidebar;
    const items = useMemo(() => {
        const hasActiveItem = HomeMenuItems.some(({ active }) => active);
        if (!hasActiveItem) {
            const result = HomeMenuItems.map((item, index) => {
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
        return HomeMenuItems;
    }, [HomeMenuItems]);

    const menuItems = homeItems.length ? homeItems : items;
    const menuItem = menuItems.find(({ active }) => active);

    const handleClickItem = (e, id, item) => {
        if (!loginType) {
            return;
        }
        isActive(e, id, item);
    };

    return (
        <div className="TabletSidebar">
            <a href="/" className="TabletSidebar-logo">
                <img className="TabletSidebar-logo" src={registerLogo} alt="logo" />
            </a>
            <div className="TabletSidebar-container">
                {menuItems.map(item => {
                    return (
                        <div
                            key={item.id}
                            className="TabletSidebar-stepContainer"
                            onClick={e => handleClickItem(e, item.id, item)}
                        >
                            <div
                                className={classNames([
                                    "TabletSidebar-step",
                                    { "TabletSidebar-step--active": item.active },
                                ])}
                            />
                        </div>
                    );
                })}
                <div className="TabletSidebar-currentStep">{menuItem && menuItem.name}</div>
            </div>
        </div>
    );
};

export default TabletSidebar;

TabletSidebar.defaultProps = {
    homeItems: [],
    isActive: () => {}
};

TabletSidebar.propTypes = {
    homeItems: array,
    isActive: func
};
