import { UserEntity } from '@src/domains/user/entities/user.entity';

import {
    SET_USER,
    SET_LOGGED,
    TOGGLE_LOGGED,
    CLEAR_STORAGE,
    SetUserAction,
    SetLoggedAction,
    ClearStorageAction,
} from './types';

export function setUser(user: UserEntity): SetUserAction {
    return {
        type: SET_USER,
        payload: user,
    };
}

export function setLogged(payload = false): SetLoggedAction {
    return {
        type: SET_LOGGED,
        payload
    };
}

export function toggleLogged(): SetLoggedAction {
    return { type: TOGGLE_LOGGED };
}

export function clearStorage(): ClearStorageAction {
    return { type: CLEAR_STORAGE };
}
