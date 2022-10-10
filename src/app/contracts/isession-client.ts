export const ISessionClientSymbol = Symbol.for('ISessionClient');

export interface ISessionClient {
    get(name: string): string | undefined;
    set(name: string, value: string): void;
    remove(name: string): void;
}
