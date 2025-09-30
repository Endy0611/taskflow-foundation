// src/Implement/api.js
// Unified API client with safe JSON parsing and cookie support.

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";

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

    // Adjust the body keys to match your backend DTO:
    // If your backend expects { email, password }, change to { email: id, password }
    // If it expects { usernameOrEmail, password }, change below accordingly.
    return request("/auth/login", { method: "POST", body: { identity: id, password } });
  },

  async me() {
    return request("/auth/me");
  },

  async logout() {
    return request("/auth/logout", { method: "POST" });
  },
};
