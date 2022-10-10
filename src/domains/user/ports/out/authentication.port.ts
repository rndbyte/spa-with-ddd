import { AuthCredentials } from '@src/domains/user/types';
import { UserEntity } from '@src/domains/user/entities/user.entity';

export const AuthenticationPortSymbol = Symbol.for('AuthenticationPort');

export interface AuthenticationPort {
    attemptToAuthenticate(credentials: AuthCredentials): Promise<UserEntity>;
    logoutUser(): Promise<void>;
}
