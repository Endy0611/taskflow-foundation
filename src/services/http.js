// src/services/http.js
// Robust, merged HTTP helper with DEV proxy, Bearer auth, and safe parsing.

import * as Api from "../Implement/api.js";

/* -------------------------------------------------------------------------- */
/* Base URL resolution                                                        */
/*  - In DEV we default to a Vite proxy at /api                               */
/*  - In PROD we use Api.API_BASE or VITE_* envs (fallback to istad domain)   */
/* -------------------------------------------------------------------------- */
const DEV = import.meta.env.DEV;

const RUNTIME_BASE =
  Api.API_BASE ??
  import.meta.env.VITE_API_BASE ??
  import.meta.env.VITE_BASE_URL ??
  "https://taskflow-api.istad.co";

export const API_BASE = ((DEV ? "/api" : RUNTIME_BASE)).replace(/\/+$/, "");

/* -------------------------------------------------------------------------- */
/* Token helpers                                                              */
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
/* Utils                                                                       */
/* -------------------------------------------------------------------------- */
const isFormOrBlob = (body) =>
  (typeof FormData !== "undefined" && body instanceof FormData) ||
  (typeof Blob !== "undefined" && body instanceof Blob);

const buildUrl = (path) =>
  /^https?:\/\//i.test(path)
    ? path
    : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

async function parseResponse(res) {
  // 204 No Content
  if (res.status === 204) return null;

  const text = await res.text().catch(() => "");
  if (!res.ok) {
    let err;
    try {
      err = text ? JSON.parse(text) : {};
    } catch {
      err = { message: text || res.statusText };
    }
    err.status = res.status;
    throw err;
  }

  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/* -------------------------------------------------------------------------- */
/* Main HTTP wrapper                                                          */
/*  - Sends Authorization: Bearer <token> if found                            */
/*  - DOES NOT send cookies (credentials: 'omit') to avoid CORS issues        */
/*  - Handles JSON/FormData automatically                                     */
/*  - Timeout via AbortController                                             */
/* -------------------------------------------------------------------------- */
export async function http(
  path,
  { method = "GET", body, headers = {}, timeoutMs = 15000 } = {}
) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new DOMException("Timeout", "AbortError")),
    timeoutMs
  );

  try {
    const token = getAuthToken();
    const url = buildUrl(path);
    const formLike = isFormOrBlob(body);

    const res = await fetch(url, {
      method,
      mode: "cors",
      credentials: "omit", // IMPORTANT: avoid cookie-based CORS problems
      headers: {
        Accept: "application/json, text/plain;q=0.8,*/*;q=0.5",
        ...(formLike ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body == null ? undefined : (formLike ? body : JSON.stringify(body)),
      signal: controller.signal,
    });

    return await parseResponse(res);
  } catch (e) {
    if (e?.name === "AbortError") {
      throw { status: 0, message: "Request timed out" };
    }
    // propagate server-shaped errors or normalize network errors
    throw { status: e?.status ?? 0, message: e?.message || "Network error" };
  } finally {
    clearTimeout(timer);
  }
}

// Optional convenience helpers:
// export const get = (p, opts) => http(p, { ...opts, method: "GET" });
// export const post = (p, body, opts) => http(p, { ...opts, method: "POST", body });
// export const patch = (p, body, opts) => http(p, { ...opts, method: "PATCH", body });
// export const del = (p, opts) => http(p, { ...opts, method: "DELETE" });
