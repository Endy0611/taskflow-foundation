// src/services/workspaceService.js
import { http } from "./http";
import * as Api from "../Implement/api.js"; // robust namespace import (+ .js)

// Use PATHS from api.js if present; otherwise fall back to sensible defaults.
const PATHS = Api.PATHS ?? {
  WS_MEMBERS_ADD: "/workspaceMembers/addMembers",
  WS_MEMBERS_FIND: "/workspaceMembers/findWorkspaceMembers",
  WS_MEMBERS_UPDATE: (id) => `/workspaceMembers/${id}`,
  WS_MEMBERS_DELETE: (id) => `/workspaceMembers/${id}`,
  USERS_FIND_BY_EMAIL: "/users/findByEmail",
  INVITES_CREATE: (workspaceId) => `/workspaces/${workspaceId}/invites`,
};

// ---------- helpers ----------
const getIdFromUserRef = (val) => {
  if (!val) return undefined;
  // supports "/users/3" or "users/3"
  const m = String(val).match(/\/?users\/(\d+)/i);
  return m ? Number(m[1]) : undefined;
};

// Map API membership payload -> UI member shape (tolerant of variants)
function mapMember(x) {
  const membershipId = x?.membershipId ?? x?.id;
  const permission = x?.permission ?? x?.role ?? "VIEWER";

  // user can be an object or a string ref like "/users/3"
  const u = typeof x?.user === "string" ? { id: getIdFromUserRef(x.user) } : (x?.user || {});

  const name =
    u.name || u.fullName || u.displayName || u.username || u.email || "Unknown";
  const initials = (name || "U U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const username = u.username
    ? `@${u.username}`
    : u.email
    ? `@${u.email.split("@")[0]}`
    : "@user";

  return {
    membershipId,
    permission, // "OWNER" | "EDITOR" | "VIEWER"
    userId: u.id,
    name,
    username,
    email: u.email || "",
    lastActive: x?.lastActive || "—",
    color: "bg-indigo-600",
    initials,
  };
}

// ---------- API calls ----------
export async function fetchWorkspaceMembers(workspaceId) {
  const data = await http(
    `${PATHS.WS_MEMBERS_FIND}?workspaceId=${workspaceId}`,
    { method: "GET" }
  );
  const list = Array.isArray(data?.content) ? data.content : (Array.isArray(data) ? data : []);
  return list.map(mapMember);
}

export async function resolveUserIdByEmail(email) {
  const data = await http(
    `${PATHS.USERS_FIND_BY_EMAIL}?email=${encodeURIComponent(email)}`,
    { method: "GET" }
  );
  if (data?.id) return data.id;
  if (Array.isArray(data?.content) && data.content[0]?.id) return data.content[0].id;
  if (Array.isArray(data) && data[0]?.id) return data[0].id;
  throw { message: "User not found by email" };
}

export async function addMemberByUserId({ workspaceId, userId, permission }) {
  return http(PATHS.WS_MEMBERS_ADD, {
    method: "POST",
    body: {
      user: `/users/${userId}`,
      workspace: `/workspaces/${workspaceId}`,
      permission, // "OWNER" | "EDITOR" | "VIEWER"
    },
  });
}

export async function addMemberByEmail({ workspaceId, email, permission }) {
  const userId = await resolveUserIdByEmail(email);
  return addMemberByUserId({ workspaceId, userId, permission });
}

export async function updateMemberRole({ membershipId, permission }) {
  return http(PATHS.WS_MEMBERS_UPDATE(membershipId), {
    method: "PATCH",
    body: { permission },
  });
}

export async function removeMember({ membershipId }) {
  return http(PATHS.WS_MEMBERS_DELETE(membershipId), { method: "DELETE" });
}

export async function createInviteLink(workspaceId) {
  try {
    const res = await http(PATHS.INVITES_CREATE(workspaceId), { method: "POST" });
    if (res?.link) return res.link;
    if (res?.token) return `${window.location.origin}/join/${workspaceId}?token=${res.token}`;
  } catch {
    // Dev fallback (no server invite endpoint)
    const uuid =
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    const link = `${window.location.origin}/join/${workspaceId}?token=${uuid}`;
    localStorage.setItem(
      `ws_invite_${workspaceId}_${uuid}`,
      JSON.stringify({ workspaceId, token: uuid, createdAt: Date.now(), devOnly: true })
    );
    return link;
  }
}
