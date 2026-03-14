const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://edupaycore.sls.com.ng").replace(/\/+$/, "");

function isJwt(token) {
  return typeof token === "string" && token.split(".").length === 3;
}

export async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (!options.skipAuth && isJwt(token)) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  let data = null;
  const text = await res.text();

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  const appLevelFailure =
    data &&
    typeof data === "object" &&
    data.succeeded === false;

  if (!res.ok || appLevelFailure) {
    const message =
      data?.message ||
      data?.error ||
      data?.title ||
      `Request failed (${res.status})`;

    const error = new Error(message);
    error.status = res.status;
    error.payload = data;
    throw error;
  }

  return data;
}