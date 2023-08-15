import { SAVEMEMBER, DELETEMEMBER, EDITMEMBER } from './Types';

const saveMembers = res => {
    return {
        type: SAVEMEMBER,
        value: res
    };
};

const deleteMember = res => {
    return {
        type: DELETEMEMBER,
        value: res
    };
};

const editMember = res => {
    return {
        type: EDITMEMBER,
        value: res
    };
};
export { saveMembers, deleteMember, editMember };
