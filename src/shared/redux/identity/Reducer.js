import SAVEFILES from './Types';

const INITIAL_STATE = {
    files: ''
};
const FileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVEFILES:
            return {
                ...state,
                files: action.value
            };
        default:
            return state;
    }
};

export default FileReducer;
