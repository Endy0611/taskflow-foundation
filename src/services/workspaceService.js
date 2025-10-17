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

  // Workspaces (read/update)
  WORKSPACES_FIND_BY_ID: (id) => `/workspaces/${id}`,
  WORKSPACES_UPDATE: (id) => `/workspaces/${id}`,

  // Workspaces (create)
  WORKSPACES_CREATE_NEW: "/workspaces/createNew", // preferred if your API has it
  WORKSPACES_CREATE_FALLBACK: "/workspaces",      // fallback if not

  // User → Workspaces
  USER_WORKSPACES_BY_USERID: (userId) => `/user-workspaces/${userId}`,
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

const idFromHref = (href, key) => {
  const m = String(href || "").match(new RegExp(`/${key}/([^/]+)`, "i"));
  return m ? (isNaN(m[1]) ? m[1] : Number(m[1])) : undefined;
};

const stripHal = (obj = {}) => {
  const clone = { ...obj };
  delete clone._links;
  delete clone._embedded;
  return clone;
};

/** Normalize → { id, name, visibility: "PRIVATE"|"PUBLIC", theme? } */
const normalizeWorkspace = (raw = {}, fallbackId) => {
  const id =
    raw.id ??
    idFromHref(raw?._links?.self?.href, "workspaces") ??
    fallbackId;

  const name = raw.name ?? raw.title ?? raw.displayName ?? "Workspace";

  // visibility can be string or a few boolean flavors
  let visibility = raw.visibility ?? raw.privacy;
  if (!visibility) {
    if (typeof raw.private === "boolean") visibility = raw.private ? "PRIVATE" : "PUBLIC";
    else if (typeof raw.isPrivate === "boolean") visibility = raw.isPrivate ? "PRIVATE" : "PUBLIC";
    else if (typeof raw.public === "boolean") visibility = raw.public ? "PUBLIC" : "PRIVATE";
    else visibility = "PRIVATE";
  }

  return {
    id,
    name,
    theme: raw.theme ?? null,
    visibility: String(visibility).toUpperCase(),
    _raw: raw,
  };
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
  const rawMembers =
    Array.isArray(res)
      ? res
      : res?._embedded?.workspaceMembers ??
        res?.content ?? // some pageable responses
        [];
  const enriched = await Promise.all(
    rawMembers.map(async (m) => {
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
    res?._embedded?.users?.[0] ||
    res?._embedded?.user ||
    (res && res.username ? res : null);
  if (!user) throw new Error("User not found");
  return user;
}

export async function addMemberByUsername({ workspaceId, username, permission }) {
  if (!workspaceId || !username) throw new Error("Workspace ID and username required");
  const userRes = await searchUserByUsername(username);
  const userHref =
    userRes?._links?.self?.href ||
    userRes?._links?.user?.href ||
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
  return await http.patch(PATHS.WS_MEMBERS_UPDATE(membershipId), { permission });
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
    // Dev-only fallback link
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
/* 🧩 WORKSPACE: fetch + update + create                                      */
/* -------------------------------------------------------------------------- */
export async function fetchWorkspaceById(id) {
  if (!id) throw new Error("Workspace id required");
  const raw = await http.get(PATHS.WORKSPACES_FIND_BY_ID(id));
  return normalizeWorkspace(raw, id);
}

export async function updateWorkspace(id, payload = {}) {
  if (!id) throw new Error("Workspace id required");

  const body = {};
  if ("name" in payload && payload.name != null) body.name = payload.name;

  if ("visibility" in payload && payload.visibility != null) {
    const v = String(payload.visibility).toUpperCase();
    body.visibility = v;
    body.private = v === "PRIVATE";
  } else if ("private" in payload && typeof payload.private === "boolean") {
    body.private = payload.private;
    body.visibility = payload.private ? "PRIVATE" : "PUBLIC";
  }

  try {
    // Prefer merge-patch; your http.js sets the right header automatically for PATCH
    const res = await http.patch(PATHS.WORKSPACES_UPDATE(id), body);
    return normalizeWorkspace(res, id);
  } catch {
    // Fallback to PUT with a merged entity (for servers that dislike PATCH)
    const current = await http.get(PATHS.WORKSPACES_FIND_BY_ID(id));
    const merged = stripHal({ ...current, ...body });
    const res2 = await http.put(PATHS.WORKSPACES_UPDATE(id), merged);
    return normalizeWorkspace(res2, id);
  }
}

/** Create a workspace (tries /createNew then falls back to /workspaces). */
export async function createWorkspace({ name, theme = "ANGKOR", visibility = "PRIVATE" }) {
  if (!name) throw new Error("name is required");
  const payload = { name, theme, visibility };

  try {
    const created = await http.post(PATHS.WORKSPACES_CREATE_NEW, payload);
    return normalizeWorkspace(created);
  } catch {
    const created = await http.post(PATHS.WORKSPACES_CREATE_FALLBACK, payload);
    return normalizeWorkspace(created);
  }
}

/* -------------------------------------------------------------------------- */
/* ✅ USER → WORKSPACES + remember last used                                  */
/* -------------------------------------------------------------------------- */
export async function fetchUserWorkspacesByUserId(userId) {
  if (!userId) throw new Error("userId required");
  const res = await http.get(PATHS.USER_WORKSPACES_BY_USERID(userId));
  const list = Array.isArray(res)
    ? res
    : res?._embedded?.workspaces ??
      res?.content ?? // if pageable
      [];
  // Dedup by id (some backends return duplicates)
  const map = new Map(
    list.map((w) => {
      const id = w.id ?? idFromHref(w?._links?.self?.href, "workspaces");
      return [id, w];
    })
  );
  return Array.from(map.values()).map((w) => normalizeWorkspace(w));
}

/* Keep old import name working */
export const fetchUserWorkspaces = fetchUserWorkspacesByUserId;

/** LocalStorage helpers for “last opened workspace”. */
export const getCurrentWorkspaceId = () =>
  localStorage.getItem("current_workspace_id");

export const setCurrentWorkspaceId = (id) => {
  if (id == null) return;
  localStorage.setItem("current_workspace_id", String(id));
};

/**
 * Ensure we have a valid current workspace for this user.
 * - If none stored, pick the first one and store it.
 * - If stored but missing from server list, replace with first one.
 * Returns { list, current }.
 */
export async function ensureCurrentWorkspaceForUser(userId) {
  const list = await fetchUserWorkspacesByUserId(userId);
  if (!list.length) return { list, current: null };

  const stored = getCurrentWorkspaceId();
  const keep = list.find((w) => String(w.id) === String(stored));
  const current = keep || list[0];
  setCurrentWorkspaceId(current.id);
  return { list, current };
}
