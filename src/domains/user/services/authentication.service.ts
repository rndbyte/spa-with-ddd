import { inject, injectable } from 'inversify';
import { AuthCredentials } from '@src/domains/user/types';
import { UserEntity } from '@src/domains/user/entities/user.entity';
import { LoginUserUseCase } from '@src/domains/user/ports/in/login-user.use-case';
import { LogoutUserUseCase } from '@src/domains/user/ports/in/logout-user.use-case';
import { AuthenticationError } from '@src/domains/user/errors/authentication.error';
import { AuthenticationPort, AuthenticationPortSymbol } from '@src/domains/user/ports/out/authentication.port';

@injectable()
export class AuthenticationService implements LoginUserUseCase, LogoutUserUseCase {
    public constructor(
        @inject(AuthenticationPortSymbol)
        private readonly _authenticationPort: AuthenticationPort
    ) {}

    public async login(
        credentials: AuthCredentials,
    ): Promise<UserEntity> {
        try {
            return await this._authenticationPort.attemptToAuthenticate(credentials);
        } catch (e: unknown) {
            const error = e as Error;
            throw new AuthenticationError(error.message);
        }
    }

    public async logout(): Promise<void> {
        try {
            await this._authenticationPort.logoutUser();
        } catch (e: unknown) {
            const error = e as Error;
            throw new AuthenticationError(error.message);
        }
    }
}
