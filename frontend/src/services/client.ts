const BASE_URL = import.meta.env.VITE_API_URL;

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error("API error");
    }

    if (res.status === 204) return;

    return res.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url, "GET"),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: any) => request<T>(url, "PATCH", data),
  delete: (url: string) => request(url, "DELETE"),
};
