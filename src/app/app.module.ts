import { ContainerModule, interfaces } from 'inversify';
import { UserPersistenceAdapter } from '@src/app/adapters/user-persistence.adapter';
import { UserAuthenticationAdapter } from '@src/app/adapters/user-authentication.adapter';
import { LoadUserPort, LoadUserPortSymbol } from '@src/domains/user/ports/out/load-user.port';
import { AuthenticationPort, AuthenticationPortSymbol } from '@src/domains/user/ports/out/authentication.port';

export const appModule = new ContainerModule(
    (bind: interfaces.Bind) => {
        bind<LoadUserPort>(LoadUserPortSymbol)
            .to(UserPersistenceAdapter);

        bind<AuthenticationPort>(AuthenticationPortSymbol)
            .to(UserAuthenticationAdapter);
    }
);
