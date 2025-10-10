// src/services/workspaceService.js
import { http } from "./http";
import * as Api from "../Implement/api.js";

/* -------------------------------------------------------------------------- */
/* 📡 API PATHS CONFIG                                                        */
/* -------------------------------------------------------------------------- */
const defaultPaths = {
  // Members
  WS_MEMBERS_ADD: "/workspaceMembers",
  WS_MEMBERS_FIND: (workspaceId) => `/workspaces/${workspaceId}/workspaceMembers`,
  WS_MEMBERS_UPDATE: (id) => `/workspaceMembers/${id}`,
  WS_MEMBERS_DELETE: (id) => `/workspaceMembers/${id}`,

  // Users
  USERS_SEARCH_BY_USERNAME: (username) =>
    `/users/search/findByUsername?username=${encodeURIComponent(username)}`,
  USERS_FIND_BY_ID: (id) => `/users/${id}`,

  // Invites
  INVITES_CREATE: (workspaceId) => `/workspaces/${workspaceId}/invites`,

  // Workspaces
  WORKSPACES_FIND_BY_ID: (id) => `/workspaces/${id}`,
  WORKSPACES_UPDATE: (id) => `/workspaces/${id}`,
};

export const PATHS = { ...(Api.PATHS || {}), ...defaultPaths };

/* -------------------------------------------------------------------------- */
/* 🧠 HELPERS                                                                 */
/* -------------------------------------------------------------------------- */
const getIdFromUserRef = (val) => {
  if (!val) return undefined;
  const m = String(val).match(/\/?users\/([^/]+)/i);
  return m ? (isNaN(m[1]) ? m[1] : Number(m[1])) : undefined;
};

const getIdFromWsHref = (href) => {
  if (!href) return undefined;
  const m = String(href).match(/\/workspaces\/([^/]+)/i);
  return m ? (isNaN(m[1]) ? m[1] : Number(m[1])) : undefined;
};

const stripHal = (obj = {}) => {
  const clone = { ...obj };
  delete clone._links;
  delete clone._embedded;
  return clone;
};

/** Normalize → { id, name, visibility: "PRIVATE"|"PUBLIC" } */
const normalizeWorkspace = (raw = {}, fallbackId) => {
  const id =
    raw.id ??
    getIdFromWsHref(raw?._links?.self?.href) ??
    fallbackId;

  const name =
    raw.name ??
    raw.title ??
    raw.displayName ??
    "Workspace";

  // Accept a variety of shapes from the backend
  let visibility = raw.visibility ?? raw.privacy;
  if (!visibility) {
    if (typeof raw.private === "boolean") visibility = raw.private ? "PRIVATE" : "PUBLIC";
    else if (typeof raw.isPrivate === "boolean") visibility = raw.isPrivate ? "PRIVATE" : "PUBLIC";
    else if (typeof raw.public === "boolean") visibility = raw.public ? "PUBLIC" : "PRIVATE";
    else visibility = "PRIVATE";
  }
  visibility = String(visibility).toUpperCase();

  return { id, name, visibility, _raw: raw };
};

/* -------------------------------------------------------------------------- */
/* 👥 MEMBERS                                                                 */
/* -------------------------------------------------------------------------- */
async function fetchUserDetail(userRef) {
  const id = getIdFromUserRef(userRef);
  if (!id) return null;
  try {
    return await http.get(PATHS.USERS_FIND_BY_ID(id));
  } catch (err) {
    console.warn("⚠️ fetchUserDetail failed:", err);
    return null;
  }
}

function mapMember(member, user = {}) {
  const u = user || {};
  const fullName =
    u.fullName ||
    u.displayName ||
    [u.givenName, u.familyName].filter(Boolean).join(" ") ||
    u.name ||
    u.username ||
    u.email ||
    "Unknown";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    membershipId: member.id ?? member.membershipId,
    userId: u.id ?? getIdFromUserRef(member.user),
    name: fullName,
    username: u.username ?? (u.email ? `@${u.email.split("@")[0]}` : "—"),
    email: u.email ?? "—",
    permission: member.permission ?? "VIEWER",
    color: "bg-indigo-600",
    initials,
    lastActive: member.lastActive ?? "—",
  };
}

export async function fetchWorkspaceMembers(workspaceId) {
  const res = await http.get(PATHS.WS_MEMBERS_FIND(workspaceId));
  const members = res?._embedded?.workspaceMembers ?? [];
  const enriched = await Promise.all(
    members.map(async (m) => {
      let userData = null;
      if (m.user && typeof m.user === "object") userData = m.user;
      else if (m.user && typeof m.user === "string") userData = await fetchUserDetail(m.user);
      return mapMember(m, userData);
    })
  );
  return enriched;
}

export async function searchUserByUsername(username) {
  if (!username) throw new Error("Username required");
  const res = await http.get(PATHS.USERS_SEARCH_BY_USERNAME(username));
  const user =
    res._embedded?.users?.[0] ||
    res._embedded?.user ||
    (res.username ? res : null);
  if (!user) throw new Error("User not found");
  return user;
}

export async function addMemberByUsername({ workspaceId, username, permission }) {
  if (!workspaceId || !username) throw new Error("Workspace ID and username required");
  const userRes = await searchUserByUsername(username);
  const userHref =
    userRes._links?.self?.href ||
    userRes._links?.user?.href ||
    `/users/${userRes.id}`;
  const payload = {
    user: userHref,
    workspace: `/workspaces/${workspaceId}`,
    permission: permission ?? "VIEWER",
  };
  return await http.post(PATHS.WS_MEMBERS_ADD, payload);
}

export async function updateMemberRole({ membershipId, permission }) {
  if (!membershipId) throw new Error("membershipId required");
  if (!permission) throw new Error("permission required");
  try {
    return await http.patch(PATHS.WS_MEMBERS_UPDATE(membershipId), { permission });
  } catch (err) {
    console.error("❌ updateMemberRole failed:", err);
    throw err;
  }
}

export async function removeMember({ membershipId }) {
  if (!membershipId) throw new Error("membershipId required");
  return await http.delete(PATHS.WS_MEMBERS_DELETE(membershipId));
}

export async function createInviteLink(workspaceId) {
  try {
    const res = await http.post(PATHS.INVITES_CREATE(workspaceId));
    if (res?.link) return res.link;
    if (res?.token) return `${window.location.origin}/join/${workspaceId}?token=${res.token}`;
  } catch {
    const uuid =
      crypto?.randomUUID?.() ??
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    const link = `${window.location.origin}/join/${workspaceId}?token=${uuid}`;
    localStorage.setItem(
      `ws_invite_${workspaceId}_${uuid}`,
      JSON.stringify({ workspaceId, token: uuid, createdAt: Date.now(), devOnly: true })
    );
    return link;
  }
}

/* -------------------------------------------------------------------------- */
/* 🧩 WORKSPACE: fetch + update                                               */
/* -------------------------------------------------------------------------- */
export async function fetchWorkspaceById(id) {
  if (!id) throw new Error("Workspace id required");
  const raw = await http.get(PATHS.WORKSPACES_FIND_BY_ID(id));
  return normalizeWorkspace(raw, id);
}

/**
 * Update workspace name/visibility.
 * payload: { name?: string, visibility?: "PRIVATE"|"PUBLIC" }  (also accepts { private?: boolean })
 * - Tries PATCH (merge-patch) first.
 * - Fallback to PUT with full merged entity (strip HAL).
 */
export async function updateWorkspace(id, payload = {}) {
  if (!id) throw new Error("Workspace id required");

  // Build compact patch body
  const body = {};
  if ("name" in payload && payload.name != null) body.name = payload.name;

  if ("visibility" in payload && payload.visibility != null) {
    const v = String(payload.visibility).toUpperCase(); // "PRIVATE" | "PUBLIC"
    body.visibility = v;
    body.private = v === "PRIVATE"; // help servers that use boolean
  } else if ("private" in payload && typeof payload.private === "boolean") {
    body.private = payload.private;
    body.visibility = payload.private ? "PRIVATE" : "PUBLIC";
  }

  // 1) Try PATCH (merge-patch)
  try {
    const res = await http.patch(PATHS.WORKSPACES_UPDATE(id), body, {
      headers: {
        "Content-Type": "application/merge-patch+json",
        Accept: "application/hal+json, application/json",
      },
      withCredentials: true,
    });
    return normalizeWorkspace(res, id);
  } catch (e1) {
    // 2) Fallback to PUT with full entity (merge current + patch)
    try {
      const current = await http.get(PATHS.WORKSPACES_FIND_BY_ID(id));
      const merged = stripHal({ ...current, ...body });
      // Avoid sending unknown props if backend is strict
      if (!("name" in merged) && body.name != null) merged.name = body.name;
      if (!("visibility" in merged) && body.visibility != null) merged.visibility = body.visibility;
      if (!("private" in merged) && typeof body.private === "boolean") merged.private = body.private;

      const res2 = await http.put(PATHS.WORKSPACES_UPDATE(id), merged, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/hal+json, application/json",
        },
        withCredentials: true,
      });
      return normalizeWorkspace(res2, id);
    } catch (e2) {
      // 3) Optional method-override escape hatch (some proxies block PATCH/PUT)
      try {
        const res3 = await http.post(PATHS.WORKSPACES_UPDATE(id), body, {
          headers: {
            "X-HTTP-Method-Override": "PATCH",
            "Content-Type": "application/json",
            Accept: "application/hal+json, application/json",
          },
          withCredentials: true,
        });
        return normalizeWorkspace(res3, id);
      } catch (e3) {
        const status =
          e1?.response?.status ||
          e2?.response?.status ||
          e3?.response?.status ||
          e1?.status ||
          e2?.status ||
          e3?.status;

        if (status === 403) {
          // Most common case with Spring: CSRF/permissions
          throw new Error(
            "Forbidden (403). Ensure your HTTP client sends cookies (withCredentials) and XSRF token, and that your account has permission to update this workspace."
          );
        }
        throw e3 || e2 || e1;
      }
    }
  }
}
