import { SET_ACTIVE, SET_COMPLETE, SET_DEFAULT_STATE } from "../types";

const isActive = (id, state) => {
    const { HomeMenuItems } = state;
    const menuObj = HomeMenuItems.map(items => {
        const item = { ...items };
        if (items.id === id) {
            item.active = true;
        } else {
            item.active = false;
        }

        return item;
    });

    return { ...state, HomeMenuItems: menuObj };
};

const setDefaultState = (items, state) => {
    return { ...state, HomeMenuItems: items };
};

const hasCompleted = (id, state) => {
    const { HomeMenuItems } = state;
    const menuObj = HomeMenuItems.map(items => {
        const item = { ...items };
        if (items.id === id) {
            item.active = true;
        } else if (items.id < id) {
            item.active = false;
            item.hasCompleted = true;
        } else {
            item.active = false;
        }

        return item;
    });

    return { ...state, HomeMenuItems: menuObj };
};

const sidebarReducer = (state, action) => {
    switch (action.type) {
        case SET_DEFAULT_STATE:
            return setDefaultState(action.payload, state);
        case SET_ACTIVE:
            return isActive(action.payload, state);
        case SET_COMPLETE:
            return hasCompleted(action.payload, state);
        default:
            return state;
    }
};

export default sidebarReducer;
