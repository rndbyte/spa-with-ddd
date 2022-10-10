export const IHttpClientSymbol = Symbol.for('INetworkClient');

export interface HttpResponse<T = any> {
    data: T;
    status: number;
    headers: any;
}

// Any status codes that falls outside the range of 2xx cause an error.
export interface HttpError {
    response: HttpResponse;
    message: string;
}

export interface IHttpClient {
    /**
     * @throws {HttpError}
     */
    post<T>(url: string, data?: Record<string, unknown>): Promise<HttpResponse<T>>;

    /**
     * @throws {HttpError}
     */
    get<T>(url: string): Promise<HttpResponse<T>>;

    /**
     * @throws {HttpError}
     */
    update<T>(url: string, data?: Record<string, unknown>): Promise<HttpResponse<T>>;

    /**
     * @throws {HttpError}
     */
    delete<T>(url: string): Promise<HttpResponse<T>>;
    setAuthToken(token: string): void;
}
