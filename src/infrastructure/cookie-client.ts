import hardtack from 'hardtack';
import { injectable } from 'inversify';
import { ISessionClient } from '@src/app/contracts/isession-client';

@injectable()
export class CookieClient implements ISessionClient {
    public constructor(
        private readonly _path: string,
        private readonly _maxAge: number,
        private readonly _secure: boolean,
    ) {
    }

    get(name: string): string | undefined {
        return hardtack.get(name);
    }

    set(name: string, value: string): void {
        hardtack.set(name, value, {
            path: this._path,
            maxAge: this._maxAge,
            samesite: 'lax',
            ...(this._secure ? { secure: this._secure } : {}),
        });
    }

    remove(name: string): void {
        hardtack.remove(name, { path: this._path });
    }
}
