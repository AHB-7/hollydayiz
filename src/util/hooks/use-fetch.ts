import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useCallback, useState } from "react";
import { UseApiReturn } from "../../types/global";
/**
 * Custom hook to perform API requests using Axios.
 *
 * @template T - The type of the response data.
 * @param {string} url - The base URL for the API request.
 * @returns {UseApiReturn<T>} An object containing:
 *
 * ### State Variables:
 * - **`data`** (`T | null`):
 *   - The response data from the API request.
 *   - Example:
 *     ```typescript
 *     const { data } = useApi<MyDataType>("https://api.example.com/data");
 *     console.log(data); // { id: 1, name: "Item 1" } or null
 *     ```
 *
 * - **`loading`** (`boolean`):
 *   - Indicates if the request is in progress.
 *   - Example:
 *     ```typescript
 *     const { loading } = useApi<MyDataType>("https://api.example.com/data");
 *     if (loading) console.log("Loading...");
 *     ```
 *
 * - **`error`** (`Error | null`):
 *   - Contains an error object if the request fails.
 *   - Example:
 *     ```typescript
 *     const { error } = useApi<MyDataType>("https://api.example.com/data");
 *     if (error) console.error(error.message);
 *     ```
 *
 * ### `request` Method:
 * - **Description**:
 *   - A function to make the API request.
 *   - Example:
 *     ```typescript
 *     const { request } = useApi<MyDataType>("https://api.example.com/data");
 *     await request("GET");
 *     ```
 *
 * - **Parameters**:
 *   - `method` (`Method`):
 *     - The HTTP method for the request (e.g., `"GET"`, `"POST"`, `"PUT"`).
 *   - `body` (`any`, optional):
 *     - The request payload for methods like `POST` or `PUT`.
 *   - `config` (`AxiosRequestConfig`, optional):
 *     - Additional Axios configuration options.
 *   - `token` (`string`, optional):
 *     - Bearer token for authorization, appended to the request headers.
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
 *
 * ### Error Handling:
 * - Errors returned by the API are parsed to extract a meaningful message, if available.
 * - If no error message is provided by the API, a default message `"An error occurred"` is used.
 *
 * ### Special Header Example:
 * - The hook includes a custom header:
 *   ```typescript
 *   headers: {
 *       "X-Noroff-API-Key": "cda1b6c4-89c7-41ec-9483-1fdbf3d819ec"
 *   }
 *   ```
 *   - Example:
 *     ```typescript
 *     await request("GET", null, { headers: { CustomHeader: "value" } });
 *     ```
 */
export function useApi<T = any>(url: string): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

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
