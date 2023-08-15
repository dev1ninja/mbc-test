import { createStore, applyMiddleware, combineReducers } from 'redux';
import FileReducer from './identity/Reducer';
import MemberReducer from './addMember/Reducer';
import MenuReducer from './checkList/Reducer';

const logger = () => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        };
    };
};
const rootReducer = combineReducers({
    files: FileReducer,
    members: MemberReducer,
    menu: MenuReducer
});
const STORE = createStore(rootReducer, applyMiddleware(logger));
export default STORE;
