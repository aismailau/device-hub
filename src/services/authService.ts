import { ApiError, httpClient } from "./httpClient";
import type {
    SessionUser
} from "./sessionToken";
import {
    clearSessionToken,
    clearSessionUser,
    getSessionToken,
    getSessionUser,
    setSessionToken,
    setSessionUser,
} from "./sessionToken";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse<TUser = unknown> {
    sessionToken: string;
    user?: TUser;
}

export type AuthUser = SessionUser

type AuthListener = (user: AuthUser | null) => void;

class AuthService<TUser = unknown> {
    private currentUser: AuthUser | null;

    private readonly listeners = new Set<AuthListener>();

    constructor() {
        this.currentUser = getSessionUser();
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener(this.currentUser);
        }
    }

    async login(credentials: LoginCredentials): Promise<LoginResponse<TUser>> {
        const response = await httpClient.post<LoginResponse<TUser>>("/auth/login", credentials);

        const sessionToken = response.data.sessionToken;

        if (!sessionToken) {
            throw new ApiError("Missing session token in the login response", {
                status: response.status,
                data: response.data,
            });
        }

        setSessionToken(sessionToken);
        const user: AuthUser = { email: credentials.email };
        setSessionUser(user);
        this.currentUser = user;
        this.notify();

        return response.data;
    }

    logout(): void {
        clearSessionToken();
        clearSessionUser();
        this.currentUser = null;
        this.notify();
    }

    getSessionToken(): string | null {
        return getSessionToken();
    }

    getCurrentUser(): AuthUser | null {
        return this.currentUser;
    }

    subscribe(listener: AuthListener): () => void {
        this.listeners.add(listener);
        listener(this.currentUser);

        return () => {
            this.listeners.delete(listener);
        };
    }
}

export const authService = new AuthService();
