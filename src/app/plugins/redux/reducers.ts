import { combineReducers } from 'redux';
import {
    SET_USER,
    CLEAR_STORAGE,
    StorageUserState,
    SetUserAction,
    ClearStorageAction,
    SetLoggedAction,
    SET_LOGGED,
    TOGGLE_LOGGED,
} from './types';

function userReducer(
    state: StorageUserState = null,
    action: SetUserAction,
): StorageUserState {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
}

function loggedReducer(
    state = false,
    action: SetLoggedAction
): boolean {
    switch (action.type) {
        case TOGGLE_LOGGED:
            return !state;
        case SET_LOGGED:
            return action.payload;
        default:
            return state;
    }
}

const appReducer = combineReducers({
    user: userReducer,
    logged: loggedReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState, action: ClearStorageAction | SetUserAction | SetLoggedAction) => {
    switch (action.type) {
        case CLEAR_STORAGE:
            return undefined;
        default:
            return appReducer(state, action);
    }
};
