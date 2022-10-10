export const LogoutUserUseCaseSymbol = Symbol.for('LogoutUserUseCase');

export interface LogoutUserUseCase {
    logout(): Promise<void>;
}
