import { inject, injectable } from 'inversify';
import { UserRoleVo } from '@src/domains/user/value-objects/user-role.vo';
import { UserLoginVo } from '@src/domains/user/value-objects/user-login.vo';
import { UserEntity, UserId } from '@src/domains/user/entities/user.entity';
import { IHttpClient, HttpError, IHttpClientSymbol } from '@src/app/contracts/ihttp-client';
import { ISessionClient, ISessionClientSymbol } from '@src/app/contracts/isession-client';

export type UserData = {
    _id: UserId;
    login: string;
    name: string;
    role: string;
};

@injectable()
export abstract class AbstractUserAdapter {
    public constructor(
        @inject(IHttpClientSymbol)
        protected readonly _networkClient: IHttpClient,
        @inject(ISessionClientSymbol)
        protected readonly _sessionClient: ISessionClient,
    ) {
        const token = this._sessionClient.get('token');

        if (token) {
            this._networkClient.setAuthToken(token);
        }
    }

    protected mapUserDataToDomain(userData: any): UserEntity {
        const userLogin = UserLoginVo.create(userData.login);
        const userRole = UserRoleVo.create(userData.role);

        return new UserEntity(
            userData._id,
            userLogin,
            userData.name,
            userRole,
        );
    }

    protected async getUserData(): Promise<UserData> {
        const userDataResponse = await this.makeUserRequest();

        if (!this.isValidUserData(userDataResponse.data)) {
            throw new Error('Invalid user data provided by server.');
        }

        return userDataResponse.data;
    }

    private async makeUserRequest() {
        try {
            return await this._networkClient.get<UserData>('/api/v1/auth/me');
        } catch (e: unknown) {
            const error = e as HttpError;

            if (error.response.status === 401) {
                this._sessionClient.remove('token');
            }

            throw e;
        }
    }

    protected isValidUserData(data: any): boolean {
        return (
            typeof data === 'object' &&
            Object.prototype.hasOwnProperty.call(data, '_id') &&
            Object.prototype.hasOwnProperty.call(data, 'login') &&
            Object.prototype.hasOwnProperty.call(data, 'name') &&
            Object.prototype.hasOwnProperty.call(data, 'role')
        );
    }
}
