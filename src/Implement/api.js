// /src/Implement/api.js
// Centralized API helpers for login/register + exported constants

export const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_BASE_URL ||
  "http://localhost:4000"
).replace(/\/+$/, "");

// Adjust these if your backend is different
export const LOGIN_PATH = "/auth/login";
export const REGISTER_PATH = "/auth/register";
export const REFRESH_PATH = "/auth/refresh";

const safeParseJSON = async (res) => {
  const text = await res.text().catch(() => "");
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
};

async function timedFetch(url, init = {}, { timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  const id = setTimeout(
    () => controller.abort(new DOMException("Timeout", "AbortError")),
    timeoutMs
  );
  try {
    const res = await fetch(url, {
      mode: "cors",
      credentials: "omit",
      ...init,
      signal: controller.signal,
    });
    const data = await safeParseJSON(res);
    return { ok: res.ok, status: res.status, data, headers: res.headers };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      data: { message: e?.message || "Network error" },
    };
  } finally {
    clearTimeout(id);
  }
}

export const apiAuth = {
  // Username (or usernameOrEmail) + password
  async login({ username, password, email, usernameOrEmail }) {
    const identity = (username ?? usernameOrEmail ?? email ?? "").trim();
    const body = JSON.stringify({
      username: identity,
      usernameOrEmail: identity,
      email, // harmless if backend ignores
      password,
    });

    return timedFetch(`${API_BASE}${LOGIN_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  },

  async register(payload) {
    const body = JSON.stringify({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      confirmedPassword:
        payload.confirmedPassword ??
        payload.password_confirmation ??
        payload.confirmed_password,
      givenName: payload.givenName,
      familyName: payload.familyName,
      gender: payload.gender, // "MALE" | "FEMALE" | "OTHER"
    });

    return timedFetch(`${API_BASE}${REGISTER_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  },
};
