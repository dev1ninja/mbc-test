import * as _ from 'underscore';
import { SAVEMEMBER, DELETEMEMBER, EDITMEMBER } from './Types';

const INITIAL_STATE = {
    members: []
};
const MemberReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVEMEMBER:
            state.members.push(action.value);
            return {
                ...state,
                members: state.members
            };
        case DELETEMEMBER:
            return {
                ...state,
                members: _.without(state.members, _.findWhere(state.members, { email: action.value.email }))
            };
        case EDITMEMBER:
            state.members.push(action.value);
            return {
                ...state,
                members: state.members
            };
        default:
            return state;
    }
};

export default MemberReducer;
