const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://edupaycore.sls.com.ng").replace(/\/+$/, "");

function isJwt(token) {
  return typeof token === "string" && token.split(".").length === 3;
}

export function parseJwt(token) {
  if (!isJwt(token)) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT PARSE ERROR:", error);
    return null;
  }
}

export async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData && options.body !== undefined
      ? { "Content-Type": "application/json" }
      : {}),
    ...(options.headers || {}),
  };

  if (!options.skipAuth && isJwt(token)) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body:
      options.body === undefined
        ? undefined
        : isFormData
          ? options.body
          : JSON.stringify(options.body),
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
    error.data = data;
    throw error;
  }

  return data;
}