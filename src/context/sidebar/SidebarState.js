import React, { useReducer } from "react";
import PropTypes from "prop-types";
import SidebarContext from "./sidebarContext";
import SidebarReducer from "./sidebarReducer";
import { SET_ACTIVE, SET_COMPLETE, SET_DEFAULT_STATE } from "../types";

const HomeMenuItems = [
    {
        id: 1,
        name: "Account",
        active: true,
        hasCompleted: false
    },
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

const SidebarState = props => {
    const { children } = props;
    const initialState = { HomeMenuItems, activeMenu: false };
    const [state, dispatch] = useReducer(SidebarReducer, initialState);

    // set sidebar
    const isActive = id => {
        dispatch({
            type: SET_ACTIVE,
            payload: id
        });
    };

    const hasCompleted = id => {
        dispatch({
            type: SET_COMPLETE,
            payload: id
        });
    };

    const setDefaultState = () => {
        dispatch({
            type: SET_DEFAULT_STATE,
            payload: HomeMenuItems
        });
    };

    return (
        <SidebarContext.Provider
            value={{
                sidebar: state,
                isActive,
                hasCompleted,
                setDefaultState
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
SidebarState.defaultProps = {
    children: null
};
SidebarState.propTypes = {
    children: PropTypes.any
};
export default SidebarState;
