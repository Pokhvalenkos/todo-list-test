const BASE_URL = "http://localhost:3000";

type RequestMethod = "GET" | "POST" | "DELETE";

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

  return fetch(BASE_URL + url, options).then((res) => {
    if (!res.ok) {
      throw new Error("API error");
    }

    return res.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url, "GET"),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  delete: (url: string) => request(url, "DELETE"),
};
