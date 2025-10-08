import type { AxiosError, AxiosInstance } from "axios";
import axios, { AxiosHeaders } from "axios";

import { clearSessionToken, getSessionToken } from "./sessionToken";

const API_BASE_URL =
    typeof import.meta.env.VITE_API_BASE_URL === "string" && import.meta.env.VITE_API_BASE_URL.trim().length > 0
        ? import.meta.env.VITE_API_BASE_URL
        : "http://10.69.137.177:8080";

export class ApiError<TData = unknown> extends Error {
    public readonly status?: number;

    public readonly data?: TData;

    constructor(message: string, options: { status?: number; data?: TData; cause?: unknown } = {}) {
        super(message, { cause: options.cause });
        this.name = "ApiError";
        this.status = options.status;
        this.data = options.data;
    }
}

const httpClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

httpClient.interceptors.request.use((config) => {
    const token = getSessionToken();

    if (token) {
        const headers = AxiosHeaders.from(config.headers ?? {});
        headers.set("Authorization", `Bearer ${token}`);
        config.headers = headers;
    }

    return config;
});

httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const { response } = error;

        if (response?.status === 401) {
            clearSessionToken();
        }

        const fallbackMessage = error.message || "Request failed";
        const message =
            typeof response?.data === "object" && response?.data !== null && "message" in response.data
                ? String(response.data.message)
                : fallbackMessage;

        const apiError = new ApiError(message, {
            status: response?.status,
            data: response?.data,
            cause: error,
        });

        if (import.meta.env.DEV) {
            console.error("[httpClient] API error", {
                url: error.config?.url,
                method: error.config?.method,
                status: response?.status,
                message,
            });
        }

        return Promise.reject(apiError);
    },
);

export { httpClient };
