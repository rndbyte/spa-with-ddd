import { injectable } from 'inversify';
import { UserEntity } from '@src/domains/user/entities/user.entity';
import { LoadUserPort } from '@src/domains/user/ports/out/load-user.port';
import { AbstractUserAdapter } from '@src/app/adapters/abstract-user-adapter';

@injectable()
export class UserPersistenceAdapter extends AbstractUserAdapter implements LoadUserPort {
    public async loadUser(): Promise<UserEntity> {
        const userData = await this.getUserData();

        return this.mapUserDataToDomain(userData);
    }
}
