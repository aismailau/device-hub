const TOKEN_STORAGE_KEY = "device-hub:sessionToken";
const USER_STORAGE_KEY = "device-hub:sessionUser";

let inMemoryToken: string | null = null;
let inMemoryUser: SessionUser | null = null;

export interface SessionUser {
    username: string;
}

const getStorage = (): Storage | undefined => {
    if (typeof window === "undefined") {
        return undefined;
    }

    return window.sessionStorage;
};

export const getSessionToken = (): string | null => {
    if (inMemoryToken !== null) {
        return inMemoryToken;
    }

    const storage = getStorage();

    if (!storage) {
        return null;
    }

    inMemoryToken = storage.getItem(TOKEN_STORAGE_KEY);

    return inMemoryToken;
};

export const setSessionToken = (token: string): void => {
    inMemoryToken = token;

    const storage = getStorage();

    storage?.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearSessionToken = (): void => {
    inMemoryToken = null;

    const storage = getStorage();

    storage?.removeItem(TOKEN_STORAGE_KEY);
};

export const getSessionUser = (): SessionUser | null => {
    if (inMemoryUser) {
        return inMemoryUser;
    }

    const storage = getStorage();

    if (!storage) {
        return null;
    }

    const raw = storage.getItem(USER_STORAGE_KEY);

    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw) as SessionUser;

        if (parsed?.username) {
            inMemoryUser = parsed;
            return parsed;
        }
    } catch {
        storage.removeItem(USER_STORAGE_KEY);
    }

    return null;
};

export const setSessionUser = (user: SessionUser): void => {
    inMemoryUser = user;

    const storage = getStorage();

    storage?.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearSessionUser = (): void => {
    inMemoryUser = null;

    const storage = getStorage();

    storage?.removeItem(USER_STORAGE_KEY);
};
