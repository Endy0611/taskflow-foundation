/* -------------------------------------------------------------------------- */
/* 💡 ADDITIONS FOR WORKSPACE MEMBERS FLOW (keep everything above unchanged)  */
/* -------------------------------------------------------------------------- */

// Centralized paths (adjust names if your backend differs)
export const PATHS = {
  WS_MEMBERS_ADD: "/workspaceMembers/addMembers",               // POST
  WS_MEMBERS_FIND: "/workspaceMembers/findWorkspaceMembers",    // GET ?workspaceId=1
  WS_MEMBERS_UPDATE: (id) => `/workspaceMembers/${id}`,         // PATCH { permission }
  WS_MEMBERS_DELETE: (id) => `/workspaceMembers/${id}`,         // DELETE
  USERS_FIND_BY_EMAIL: "/users/findByEmail",                    // GET ?email=
  INVITES_CREATE: (workspaceId) => `/workspaces/${workspaceId}/invites`, // POST -> { link | token }
};

/* ---------------------------- Auth local storage --------------------------- */
export const getAuthToken = () => localStorage.getItem("auth_token");
export const setAuthToken = (token) =>
  token ? localStorage.setItem("auth_token", token) : localStorage.removeItem("auth_token");

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "{}");
  } catch {
    return {};
  }
};
export const setCurrentUser = (user) =>
  user ? localStorage.setItem("auth_user", JSON.stringify(user)) : localStorage.removeItem("auth_user");

export const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
};

/**
 * Helper: after a successful login/register call, try to persist token & user.
 * Use this right after apiAuth.login/register if you want auto-persist.
 * Example:
 *   const res = await apiAuth.login({ username, password });
 *   if (res.ok) applyAuthFromResponse(res.data);
 */
export function applyAuthFromResponse(data) {
  if (!data) return;
  const token =
    data.accessToken || data.token || data.jwt || data.id_token || data.idToken;
  if (token) setAuthToken(token);
  if (data.user) setCurrentUser(data.user);
}

/* ----------------------------- HTTP convenience --------------------------- */
/** Thin wrapper around your timedFetch that auto-attaches Authorization */
export async function http(path, { method = "GET", body, headers = {}, timeoutMs } = {}) {
  const token = getAuthToken();
  const res = await timedFetch(
    `${API_BASE}${path}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    { timeoutMs }
  );

  if (!res.ok) {
    const err = typeof res.data === "object" ? res.data : { message: String(res.data || "Request failed") };
    err.status = res.status;
    throw err;
  }
  return res.data; // may be null for 204
}

/* ----------------------- Workspace members API calls ---------------------- */

/** Get members of a workspace (raw API payload; map in UI/service if needed) */
export async function apiFetchWorkspaceMembers(workspaceId) {
  const data = await http(`${PATHS.WS_MEMBERS_FIND}?workspaceId=${workspaceId}`, { method: "GET" });
  // Some backends wrap results in { content: [...] }
  return Array.isArray(data?.content) ? data.content : (Array.isArray(data) ? data : []);
}

/** Resolve a user id by email */
export async function apiResolveUserIdByEmail(email) {
  const data = await http(`${PATHS.USERS_FIND_BY_EMAIL}?email=${encodeURIComponent(email)}`, { method: "GET" });
  if (data?.id) return data.id;
  if (Array.isArray(data?.content) && data.content[0]?.id) return data.content[0].id;
  if (Array.isArray(data) && data[0]?.id) return data[0].id;
  throw { message: "User not found by email" };
}

/** Add a member by user id */
export async function apiAddMemberByUserId({ workspaceId, userId, permission }) {
  return http(PATHS.WS_MEMBERS_ADD, {
    method: "POST",
    body: {
      user: `/users/${userId}`,
      workspace: `/workspaces/${workspaceId}`,
      permission, // "OWNER" | "EDITOR" | "VIEWER"
    },
  });
}

/** Add a member by email (resolves to user id first) */
export async function apiAddMemberByEmail({ workspaceId, email, permission }) {
  const userId = await apiResolveUserIdByEmail(email);
  return apiAddMemberByUserId({ workspaceId, userId, permission });
}

/** Update role/permission for a membership */
export async function apiUpdateMemberRole({ membershipId, permission }) {
  return http(PATHS.WS_MEMBERS_UPDATE(membershipId), {
    method: "PATCH",
    body: { permission },
  });
}

/** Remove a member from workspace */
export async function apiRemoveMember({ membershipId }) {
  return http(PATHS.WS_MEMBERS_DELETE(membershipId), { method: "DELETE" });
}

/** Create/copy an invite link (server preferred; dev fallback if absent) */
export async function apiCreateInviteLink(workspaceId) {
  try {
    const res = await http(PATHS.INVITES_CREATE(workspaceId), { method: "POST" });
    if (res?.link) return res.link;
    if (res?.token) return `${window.location.origin}/join/${workspaceId}?token=${res.token}`;
  } catch (e) {
    // Fallback for local dev
    const token = crypto.randomUUID();
    const link = `${window.location.origin}/join/${workspaceId}?token=${token}`;
    localStorage.setItem(
      `ws_invite_${workspaceId}_${token}`,
      JSON.stringify({ workspaceId, token, createdAt: Date.now(), devOnly: true })
    );
    return link;
  }
}
