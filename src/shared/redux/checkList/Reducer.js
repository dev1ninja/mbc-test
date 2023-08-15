import { ERRORMENU, ACTIVEMENU } from "./Types";

const INITIAL_STATE = {
    activeMenu: 1,
    errorMenuItems: []
};
const MenuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ERRORMENU:
            state.errorMenuItems.push(action.value);
            return {
                ...state,
                errorMenuItems: state.errorMenuItems
            };
        case ACTIVEMENU:
            return {
                ...state,
                activeMenu: action.value
            };
        default:
            return state;
    }
};

export default MenuReducer;
