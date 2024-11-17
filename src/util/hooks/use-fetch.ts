import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useState } from "react";
import { UseApiReturn } from "../../types/global.types";

export function useApi<T = any>(url: string): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const request = async (
        method: Method,
        body?: any,
        config?: AxiosRequestConfig,
        token?: string
    ) => {
        setLoading(true);
        setError(null);
        try {
            const headers = token
                ? {
                      Authorization: `Bearer ${token}`,
                      ...config?.headers,
                  }
                : config?.headers;

            const response: AxiosResponse<T> = await axios({
                url,
                method,
                data: body,
                ...config,
                headers,
            });

            if (response.data && typeof response.data === "object") {
                if ("data" in response.data) {
                    setData((response.data as any).data);
                } else {
                    setData(response.data);
                }
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, request };
}
