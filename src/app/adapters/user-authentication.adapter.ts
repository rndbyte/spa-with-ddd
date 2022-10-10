import { injectable } from 'inversify';
import { AuthCredentials } from '@src/domains/user/types';
import { UserEntity } from '@src/domains/user/entities/user.entity';
import { AbstractUserAdapter } from '@src/app/adapters/abstract-user-adapter';
import { AuthenticationPort } from '@src/domains/user/ports/out/authentication.port';

export type AuthData = {
    token: string;
};

@injectable()
export class UserAuthenticationAdapter extends AbstractUserAdapter implements AuthenticationPort {
    public async attemptToAuthenticate(credentials: AuthCredentials): Promise<UserEntity> {
        const token = await this.login(credentials);

        this._networkClient.setAuthToken(token);
        this._sessionClient.set('token', token);

        const userData = await this.getUserData();
        return this.mapUserDataToDomain(userData);
    }

    private async login(credentials: AuthCredentials): Promise<string> {
        const authResponse = await this._networkClient.post<AuthData>('/api/v1/auth/login', credentials);

        if (!this.isValidAuthData(authResponse.data)) {
            throw new Error('Invalid auth data provided by server.');
        }

        return authResponse.data.token;
    }

    protected isValidAuthData(data: any) {
        return (
            typeof data === 'object' &&
            Object.prototype.hasOwnProperty.call(data, 'token')
        );
    }

    public async logoutUser(): Promise<void> {
        await this._networkClient.post('/api/v1/auth/logout');
        this._sessionClient.remove('token');
    }
}
