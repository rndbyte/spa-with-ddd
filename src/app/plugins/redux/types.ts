import { UserEntity } from '@src/domains/user/entities/user.entity';

export const SET_USER = 'SET_USER';
export const SET_LOGGED = 'SET_LOGGED';
export const TOGGLE_LOGGED = 'TOGGLE_LOGGED';
export const CLEAR_STORAGE = 'CLEAR_STORAGE';

export type StorageUserState = UserEntity | null;

export interface ClearStorageAction {
    type: typeof CLEAR_STORAGE;
}

export interface SetUserAction {
    type: typeof SET_USER;
    payload: StorageUserState;
}

export interface SetLoggedAction {
    type: typeof SET_LOGGED | typeof TOGGLE_LOGGED;
    payload?: boolean;
}
