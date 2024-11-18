import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useState } from "react";
import { UseApiReturn } from "../../types/global.types";
/**
 * Custom hook to perform API requests using Axios.
 *
 * @template T - The type of the response data.
 * @param {string} url - The base URL for the API request.
 * @returns {UseApiReturn<T>} An object containing:
 * - `data` (`T | null`): The response data from the API.
 * - `loading` (`boolean`): Indicates if the request is in progress.
 * - `error` (`Error | null`): Contains an error object if the request fails.
 * - `request` (`(method: Method, body?: any, config?: AxiosRequestConfig, token?: string) => Promise<void>`):
 *   A function to make the API request.
 *
 * ### `request` Parameters:
 * - `method` (`Method`): The HTTP method for the request (e.g., `GET`, `POST`).
 * - `body` (`any`, optional): The request payload for methods like `POST` or `PUT`.
 * - `config` (`AxiosRequestConfig`, optional): Additional Axios configuration.
 * - `token` (`string`, optional): Bearer token for authorization, appended to the headers.
 *
 * ### Example Usage:
 * ```tsx
 * const { data, loading, error, request } = useApi<MyResponseType>("https://api.example.com/resource");
 *
 * useEffect(() => {
 *   request("GET");
 * }, []);
 *
 * if (loading) return <p>Loading...</p>;
 * if (error) return <p>Error: {error.message}</p>;
 * return <div>{JSON.stringify(data)}</div>;
 * ```
 */

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
                      "X-Noroff-API-Key":
                          "cda1b6c4-89c7-41ec-9483-1fdbf3d819ec",
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
