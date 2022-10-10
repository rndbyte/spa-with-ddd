import { AuthCredentials } from '@src/domains/user/types';
import { UserEntity } from '@src/domains/user/entities/user.entity';

export const LoginUserUseCaseSymbol = Symbol.for('LoginUserUserCase');

export interface LoginUserUseCase {
    login(credentials: AuthCredentials): Promise<UserEntity>;
}
