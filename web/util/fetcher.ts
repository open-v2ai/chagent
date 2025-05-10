import { getValidAccessToken } from "./token";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_URL_V1 = `${API_URL}/api/v1`;

type FetchOptions = RequestInit & {
    auth?: boolean;
};

export async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
            headers[key] = value;
        });
    } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
            headers[key] = value;
        });
    } else if (typeof options.headers === 'object' && options.headers) {
        Object.assign(headers, options.headers);
    }

    // 自动加上 Authorization
    if (options.auth) {
        const token = await getValidAccessToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL_V1}${url}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || '请求失败');
    }

    return res.json();
}