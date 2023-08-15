import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";
import { ArrowForward } from "@material-ui/icons";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckListMenu from "dashboard/components/sidebar/checkListSidebar/CheckListMenu";
import store from "shared/redux/Store";
import { activeMenuItems } from "shared/redux/checkList/Action";
import "./CheckListSidebar.scss";

const HomeMenuItems = [
    { id: 1, name: "Account", active: true, hasCompleted: false },
    {
        id: 2,
        name: "You",
        active: false,
        hasCompleted: false
    },
    {
        id: 3,
        name: "Your company",
        active: false,
        hasCompleted: false
    },
    {
        id: 4,
        name: "Agreement",
        active: false,
        hasCompleted: false
    }
];

class CheckListSidebar extends Component {
    unsubscribe = store.subscribe(() => {});

    constructor(props) {
        super(props);
        this.state = {
            homeItems: []
        };
    }

    componentDidMount() {
        this.unsubscribe();
        this.setState(
            {
                homeItems: HomeMenuItems
            },
            () => {
                const { errorMenuItems } = this.state;
                setTimeout(() => {
                    this.setCompletedItems(errorMenuItems);
                }, 500);
            }
        );
    }

    static getDerivedStateFromProps() {
        return { errorMenuItems: store.getState().menu.errorMenuItems };
    }

    setCompletedItems = errorMenuItems => {
        const storeState = errorMenuItems;
        const items = HomeMenuItems;
        const result = items
            .filter(o => !storeState.find(x => x === o.id))
            .map(o => {
                const menuItem = o;
                menuItem.hasCompleted = true;
                return items;
            });
        this.setState({
            homeItems: result[0]
        });
    };

    getIcon = (active, hasCompleted) => {
        let icon = "";
        if (!hasCompleted) {
            icon = <ErrorOutlineIcon className="error-icon" />;
        } else if (hasCompleted) {
            icon = <DoneIcon color="primary" />;
        } else if (active) {
            icon = <ArrowForward />;
        }
        return icon;
    };

    isActive = async (ev, menuId, menu) => {
        const { activeMenuItem } = this.props;
        if (menu.hasCompleted) {
            ev.preventDefault();
        } else {
            const items = HomeMenuItems;
            items.map(item => {
                if (item.id === menuId) {
                    const menuItem = item;
                    menuItem.active = true;
                    activeMenuItem(menu.id);
                } else {
                    const menuItem = item;
                    menuItem.active = false;
                }
                return items;
            });
            this.setState({
                homeItems: items
            });
        }
    };

    render() {
        const { homeItems } = this.state;
        return <CheckListMenu homeItems={homeItems || HomeMenuItems} isActive={this.isActive} />;
    }
}
const mapDispatchToProps = action => {
    return {
        activeMenuItem: res => action(activeMenuItems(res))
    };
};

export default connect(null, mapDispatchToProps)(withRouter(CheckListSidebar));
CheckListSidebar.propTypes = {
    activeMenuItem: PropTypes.func
};
CheckListSidebar.defaultProps = {
    activeMenuItem: null
};
