import { ContainerModule, interfaces } from 'inversify';
import { CookieClient } from '@src/infrastructure/cookie-client';
import { MockHttpClient } from '@src/infrastructure/mock-http-client';
import { AxiosHttpClient } from '@src/infrastructure/axios-http-client';
import { IHttpClient, IHttpClientSymbol } from '@src/app/contracts/ihttp-client';
import { ISessionClient, ISessionClientSymbol } from '@src/app/contracts/isession-client';

export const infrastructureModule = new ContainerModule(
    (bind: interfaces.Bind) => {
        const isProd = process.env.NODE_ENV === 'production';

        bind<IHttpClient>(IHttpClientSymbol).toDynamicValue(() => {
            return isProd ? new AxiosHttpClient() : new MockHttpClient();
        });

        bind<ISessionClient>(ISessionClientSymbol)
            .toDynamicValue(() => {
                // TODO move all cookie setting to the .env file
                const maxAge = (60 * 60) * 24;

                return new CookieClient(
                    '/',
                    maxAge,
                    isProd,
                );
            });
    }
);
