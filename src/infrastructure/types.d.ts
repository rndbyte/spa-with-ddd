declare module 'hardtack' {
    interface CookieOptions {
        path?: string;
        domain?: string;
        expires?: string;
        maxAge?: number;
        secure?: boolean;
        samesite?: 'lax' | 'strict';
    }

    interface IHardtack {
        get(name: string): string | undefined;
        set(name: string, value: string, options: CookieOptions): string;
        remove(name: string, options: CookieOptions): string;
    }

    const hardtack: IHardtack;
    export default hardtack;
}
