import { ERRORMENU, ACTIVEMENU } from './Types';

const errorMenuItems = res => {
    return {
        type: ERRORMENU,
        value: res
    };
};

const activeMenuItems = res => {
    return {
        type: ACTIVEMENU,
        value: res
    };
};

export { errorMenuItems, activeMenuItems };
