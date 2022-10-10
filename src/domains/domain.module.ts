import { ContainerModule, interfaces } from 'inversify';
import { UserService } from '@src/domains/user/services/user.service';
import { AuthenticationService } from '@src/domains/user/services/authentication.service';
import { LoginUserUseCase, LoginUserUseCaseSymbol } from '@src/domains/user/ports/in/login-user.use-case';
import { LogoutUserUseCase, LogoutUserUseCaseSymbol } from '@src/domains/user/ports/in/logout-user.use-case';
import { GetUserDataUseCase, GetUserDataUseCaseSymbol} from '@src/domains/user/ports/in/get-user-data.use-case';

export const domainModule = new ContainerModule(
    (bind: interfaces.Bind) => {
        bind<LoginUserUseCase>(LoginUserUseCaseSymbol)
            .to(AuthenticationService);

        bind<LogoutUserUseCase>(LogoutUserUseCaseSymbol)
            .to(AuthenticationService);

        bind<GetUserDataUseCase>(GetUserDataUseCaseSymbol)
            .to(UserService);
    }
);
