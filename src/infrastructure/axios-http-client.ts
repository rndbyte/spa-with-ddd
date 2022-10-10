import { injectable } from 'inversify';
import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { IHttpClient } from '@src/app/contracts/ihttp-client';

@injectable()
export class AxiosHttpClient implements IHttpClient {
    protected readonly _axios: AxiosInstance;

    public constructor() {
        this._axios = axios.create({
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
    }

    public post(url: string, data?: Record<string, unknown>): AxiosPromise {
        return this._axios.post(url, data);
    }

    public get(url: string): AxiosPromise {
        return this._axios.get(url);
    }

    public update(url: string, data?: Record<string, unknown>): AxiosPromise {
        return this._axios.put(url, data);
    }

    public delete(url: string): AxiosPromise {
        return this._axios.delete(url);
    }

    public setAuthToken(token: string): void {
        this._axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
}
