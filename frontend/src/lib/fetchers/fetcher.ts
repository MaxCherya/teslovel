import i18n from "../../locales";

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetcherOptions extends RequestInit {
    method?: Method;
    body?: any;
    skipAuthRefresh?: boolean;
}

const normalizeHeaders = (headersInit?: HeadersInit): Record<string, string> => {
    if (!headersInit) return {};
    if (headersInit instanceof Headers) {
        const result: Record<string, string> = {};
        headersInit.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }
    if (Array.isArray(headersInit)) {
        return Object.fromEntries(headersInit);
    }
    return headersInit as Record<string, string>;
};

export const fetcher = async (
    url: string,
    options: FetcherOptions = {},
): Promise<Response> => {
    const method = options.method?.toUpperCase() || 'GET';
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
        'X-Language': i18n.language,
        ...normalizeHeaders(options.headers),
    };

    if (!isFormData && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const fetchWithCookies = async (): Promise<Response> => {
        return fetch(url, {
            ...options,
            method,
            credentials: 'include',
            headers,
        });
    };

    let res = await fetchWithCookies();

    const skipAuthRefresh = options.skipAuthRefresh || false;

    // Refresh logic (only if it's really an auth issue)
    if (!skipAuthRefresh && (res.status === 401 || res.status === 403) && url !== '/api/accounts/token/refresh/') {
        let errorText: string | null = null;

        try {
            const json = await res.clone().json();
            errorText = json.detail;
        } catch {
            errorText = await res.clone().text();
        }

        const needsRefresh =
            res.status === 401 ||
            (res.status === 403 && errorText?.includes("Authentication credentials were not provided"));

        if (needsRefresh) {
            const refreshRes = await fetch('/api/accounts/token/refresh/', {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.ok) {
                res = await fetchWithCookies();
            } else {
                window.location.href = '/login';
                throw new Error('Unauthorized: Token refresh failed');
            }
        }
    }

    return res;
};