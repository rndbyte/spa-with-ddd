import { inject, injectable } from 'inversify';
import { UserError } from '@src/domains/user/errors/user.error';
import { UserEntity } from '@src/domains/user/entities/user.entity';
import { GetUserDataUseCase } from '@src/domains/user/ports/in/get-user-data.use-case';
import { LoadUserPort, LoadUserPortSymbol } from '@src/domains/user/ports/out/load-user.port';

@injectable()
export class UserService implements GetUserDataUseCase {
    public constructor(
        @inject(LoadUserPortSymbol)
        private readonly _loadUserPort: LoadUserPort
    ) {}

    public async getUserData(): Promise<UserEntity> {
        try {
            return await this._loadUserPort.loadUser();
        } catch (e) {
            throw new UserError((e as Error).message);
        }
    }
}
