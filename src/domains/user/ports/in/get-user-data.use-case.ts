import { UserEntity, UserId } from '@src/domains/user/entities/user.entity';

export const GetUserDataUseCaseSymbol = Symbol.for('GetUserDataUseCase');

export interface GetUserDataUseCase {
    getUserData(): Promise<UserEntity>;
}
