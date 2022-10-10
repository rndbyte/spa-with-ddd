import { UserEntity } from '@src/domains/user/entities/user.entity';

export const LoadUserPortSymbol = Symbol.for('LoadUserPort');

export interface LoadUserPort {
    loadUser(): Promise<UserEntity>;
}
