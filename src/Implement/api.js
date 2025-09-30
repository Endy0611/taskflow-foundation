// src/Implement/api.js
// Unified API client with safe JSON parsing and cookie support.

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";

// Export these so LoginPage can use them
// export const API_BASE = BASE_URL;
export const API_BASE = 'https://taskflow-api.istad.co';
export const LOGIN_PATH = "/auth/login";
export const REGISTER_PATH = "/auth/register";

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    credentials: "include", // send/receive cookies (session auth)
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await safeJson(res);
  return { ok: res.ok, status: res.status, data, res };
}

export const apiAuth = {
  // Accepts either email or username in "identity"
  async login({ identity, password }) {
    // normalize
    const id = String(identity || "").includes("@")
      ? String(identity || "").trim().toLowerCase()
      : String(identity || "").trim();

    return request(LOGIN_PATH, {
      method: "POST",
      body: { identity: id, password },
    });
  },

  async me() {
    return request("/auth/me");
  },

  async logout() {
    return request("/auth/logout", { method: "POST" });
  },
};
