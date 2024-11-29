import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useCallback, useState } from "react";
import { UseApiReturn } from "../../types/global";
/**
 * Custom hook for performing API requests with Axios.
 * Provides a simple interface for managing data, loading states, and errors in React components.
 *
 * @template T - The type of the response data.
 * @param {string} url - The base URL for the API request.
 * @returns {UseApiReturn<T>} - An object containing:
 *
 * ### State Variables:
 * - **`data`** (`T | null`): The API response data or `null` if no data is available.
 *   - Example:
 *     ```typescript
 *     const { data } = useApi<MyResponseType>("https://api.example.com/resource");
 *     console.log(data); // { id: 1, name: "Item" } or null
 *     ```
 *
 * - **`loading`** (`boolean`): Indicates whether the API request is in progress.
 *   - Example:
 *     ```typescript
 *     const { loading } = useApi<MyResponseType>("https://api.example.com/resource");
 *     if (loading) console.log("Loading...");
 *     ```
 *
 * - **`error`** (`Error | null`): An error object if the request fails, or `null` if no error occurred.
 *   - Example:
 *     ```typescript
 *     const { error } = useApi<MyResponseType>("https://api.example.com/resource");
 *     if (error) console.error(error.message);
 *     ```
 *
 * ### `request` Method:
 * - **Description**: A function to initiate an API request.
 * - **Parameters**:
 *   - `method` (`Method`): The HTTP method to use (e.g., `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`).
 *   - `body` (`any`, optional): The request payload for methods like `POST` or `PUT`.
 *   - `config` (`AxiosRequestConfig`, optional): Additional Axios configuration options.
 *   - `token` (`string`, optional): A Bearer token for authorization, added to the request headers.
 * - **Returns**: The API response data (`T`) or `null` if no data is returned.
 * - **Example**:
 *   ```typescript
 *   const { request } = useApi<MyResponseType>("https://api.example.com/resource");
 *
 *   useEffect(() => {
 *     const fetchData = async () => {
 *       try {
 *         const data = await request("GET");
 *         console.log(data); // Response data
 *       } catch (error) {
 *         console.error(error.message);
 *       }
 *     };
 *     fetchData();
 *   }, [request]);
 *   ```
 *
 * ### Features:
 * - **Error Handling**: Extracts error messages from the API response and provides a fallback message if unavailable.
 *   - Example:
 *     ```typescript
 *     const { error } = useApi<MyResponseType>("https://api.example.com/resource");
 *     if (error) console.error(error.message); // e.g., "Invalid credentials"
 *     ```
 *
 * - **Headers with API Key**: Automatically includes an `X-Noroff-API-Key` header.
 *   - Example:
 *     ```typescript
 *     await request("GET", null, { headers: { CustomHeader: "value" } });
 *     ```
 *
 * - **State Management**: Simplifies the handling of loading and error states in React components.
 *   - Example:
 *     ```tsx
 *     const { loading, error, data } = useApi<MyResponseType>("https://api.example.com/resource");
 *
 *     if (loading) return <p>Loading...</p>;
 *     if (error) return <p>Error: {error.message}</p>;
 *     return <div>{JSON.stringify(data)}</div>;
 *     ```
 *
 * ### Special Notes:
 * - Clones and extends `config.headers` with the `Authorization` header if a `token` is provided.
 * - Automatically manages `data`, `loading`, and `error` state transitions for requests.
 * - Ensures safe error handling for both API and network errors.
 */

export function useApi<T = any>(url: string): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

    const request = useCallback(
        async (
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
                          "X-Noroff-API-Key": apiKey,
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
                        return (response.data as any).data;
                    } else {
                        setData(response.data);
                        return response.data;
                    }
                }

                setData(null);
                return null;
            } catch (err: any) {
                if (err.response) {
                    const apiError =
                        err.response.data?.errors?.[0]?.message ||
                        err.response.data?.message ||
                        "An error occurred";

                    setError(new Error(apiError));
                } else {
                    setError(err);
                }
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    return { data, loading, error, request };
}
