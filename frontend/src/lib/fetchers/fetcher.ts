import i18n from "../../locales";

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetcherOptions extends RequestInit {
    method?: Method;
    body?: any;
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

    // Only sets JSON content-type when NOT using FormData
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

    // First attempt
    let res = await fetchWithCookies();

    // If unauthorized, tries refresh once
    if (res.status === 401 && url !== '/api/accounts/refresh/') {
        const refreshRes = await fetch('/api/accounts/refresh/', {
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

    return res;
};