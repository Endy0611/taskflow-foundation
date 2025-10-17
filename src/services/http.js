import * as Api from "../Implement/api.js";

/* -------------------------------------------------------------------------- */
/* 🌍 Base URL Resolution                                                     */
/* -------------------------------------------------------------------------- */
const DEV = import.meta.env.DEV;

// Dynamically set the base URL based on environment (DEV or PROD)
const RUNTIME_BASE =
  Api.API_BASE ??
  import.meta.env.VITE_API_BASE ??
  import.meta.env.VITE_BASE_URL ??
  "https://taskflow-api.istad.co"; // Fallback to the default if not found

export const API_BASE = (DEV ? "/api" : RUNTIME_BASE).replace(/\/+$/, "");

/* -------------------------------------------------------------------------- */
/* 🔐 Token Helpers                                                           */
/* -------------------------------------------------------------------------- */
export const getAuthToken =
  Api.getAuthToken ??
  (() =>
    localStorage.getItem("auth_token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    "");

/* -------------------------------------------------------------------------- */
/* ⚙️ Utilities                                                               */
/* -------------------------------------------------------------------------- */
const isFormOrBlob = (body) =>
  (typeof FormData !== "undefined" && body instanceof FormData) ||
  (typeof Blob !== "undefined" && body instanceof Blob);

const buildUrl = (path) => {
  if (/^https?:\/\//i.test(path)) return path; // If the path is absolute, return as is
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`; // Add base URL to the path
};

const getCookie = (name) => {
  if (typeof document === "undefined") return ""; // If no document (e.g., SSR), return empty string
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`)
  );
  return m ? decodeURIComponent(m[1]) : ""; // Return decoded cookie value
};

async function parseResponse(res) {
  if (res.status === 204) return null; // No content (success)

  const text = await res.text().catch(() => ""); // Catch errors during reading body
  if (!res.ok) {
    let err;
    try {
      err = text ? JSON.parse(text) : {};
    } catch {
      err = { message: text || res.statusText }; // If JSON parse fails, use raw text or status text
    }
    err.status = res.status;
    throw err; // Throw an error with status and message
  }

  if (!text) return null; // If no response body, return null
  try {
    return JSON.parse(text); // Try to parse the JSON response
  } catch {
    return text; // If parsing fails, return the raw text response
  }
}

/* -------------------------------------------------------------------------- */
/* 🚀 Unified HTTP Function                                                   */
/* -------------------------------------------------------------------------- */
export async function http(
  path,
  {
    method = "GET",
    body,
    headers = {},
    timeoutMs = 20000,
    methodOverride, // e.g., "PATCH" → sends POST with X-HTTP-Method-Override
  } = {}
) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new DOMException("Timeout", "AbortError")),
    timeoutMs
  );

  try {
    const token = getAuthToken();
    const url = buildUrl(path); // Construct the full URL
    const formLike = isFormOrBlob(body); // Check if the body is form data or blob
    const upperMethod = String(method).toUpperCase();

    // Default content-type (PATCH → merge-patch)
    const headerKeys = Object.keys(headers).reduce((a, k) => {
      a[k.toLowerCase()] = k;
      return a;
    }, {});
    const hasContentType = Boolean(headerKeys["content-type"]);
    const defaultContentType =
      formLike
        ? undefined
        : upperMethod === "PATCH"
        ? "application/merge-patch+json"
        : "application/json"; // Default content type for requests

    // CSRF/XSRF support (Spring & friends)
    const xsrf =
      getCookie("XSRF-TOKEN") ||
      getCookie("CSRF-TOKEN") ||
      getCookie("XSRF") ||
      getCookie("csrftoken");

    const finalHeaders = {
      Accept: "application/hal+json, application/json, text/plain;q=0.8,*/*;q=0.5",
      ...(defaultContentType && !hasContentType
        ? { "Content-Type": defaultContentType }
        : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(xsrf ? { "X-XSRF-TOKEN": xsrf } : {}),
      ...(methodOverride
        ? { "X-HTTP-Method-Override": String(methodOverride).toUpperCase() }
        : {}),
      ...headers,
    };

    const finalMethod = methodOverride ? "POST" : upperMethod;

    // Serialize JSON bodies automatically
    const bodyPayload =
      body == null
        ? undefined
        : formLike
        ? body
        : typeof body === "object" &&
          (finalHeaders["Content-Type"] || finalHeaders["content-type"] || "").includes(
            "json"
          )
        ? JSON.stringify(body)
        : body; // Serialize to JSON if content type is JSON

    // IMPORTANT: Include cookies for CSRF/session
    const res = await fetch(url, {
      method: finalMethod,
      mode: "cors",
      credentials: "include", // Ensure credentials (cookies) are included in requests
      headers: finalHeaders,
      body: bodyPayload,
      signal: controller.signal, // Abort signal to handle timeouts
    });

    return await parseResponse(res); // Parse and return the response
  } catch (e) {
    if (e?.name === "AbortError") {
      throw { status: 0, message: "⏱️ Request timed out" }; // Handle timeout
    }
    throw {
      status: e?.status ?? 0,
      message: e?.message || "🌐 Network or CORS error", // Handle network or other errors
    };
  } finally {
    clearTimeout(timer); // Clear timeout after the request finishes
  }
}

/* -------------------------------------------------------------------------- */
/* 🧩 Shortcut Methods                                                        */
/* -------------------------------------------------------------------------- */
http.get = (url, opts) => http(url, { ...opts, method: "GET" });
http.post = (url, body, opts) => http(url, { ...opts, method: "POST", body });
http.put = (url, body, opts) => http(url, { ...opts, method: "PUT", body });
http.patch = (url, body, opts) => http(url, { ...opts, method: "PATCH", body });
http.delete = (url, opts) => http(url, { ...opts, method: "DELETE" });

/* -------------------------------------------------------------------------- */
/* 🧠 Debug Info                                                              */
/* -------------------------------------------------------------------------- */
console.log(`%c✅ HTTP client initialized → ${API_BASE}`, "color: lime; font-weight: bold; font-size: 13px;");