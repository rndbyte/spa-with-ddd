import { injectable } from 'inversify';
import MockAdapter from 'axios-mock-adapter';
import { AxiosHttpClient } from "@src/infrastructure/axios-http-client";

@injectable()
export class MockHttpClient extends AxiosHttpClient {
    private readonly _mock: MockAdapter;

    public constructor() {
        super();
        this._mock = new MockAdapter(this._axios, { onNoMatch: 'throwException' });

        const token = 'very-important-secret-token';

        const authMatcher = (headers: Record<string, string>) => headers.Authorization === `Bearer ${token}`;

        this._mock.onPost(
            '/api/v1/auth/login',
            { login: 'Test', password: '12345' },
        ).reply(200, { token });

        this._mock.onPost(
            '/api/v1/auth/logout',
            undefined,
            { asymmetricMatch: authMatcher }
        ).reply(200);

        this._mock.onGet(
            '/api/v1/auth/me',
            undefined,
            { asymmetricMatch: authMatcher }
        ).reply(200, {
            _id: '123qwe',
            login: 'Test',
            name: 'Developer',
            role: 'ADMIN',
        });
    }
}
