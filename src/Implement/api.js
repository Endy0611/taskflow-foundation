const RAW_BASE = import.meta.env.VITE_API_BASE || "https://taskflow-api.istad.co";
export const API_BASE = RAW_BASE.replace(/\/+$/, "");

const lead = (p, d) => (p ?? d).toString().startsWith("/") ? (p ?? d) : `/${p ?? d}`;
export const LOGIN_PATH    = lead(import.meta.env.VITE_LOGIN_PATH, "/auth/login");
export const REGISTER_PATH = lead(import.meta.env.VITE_REGISTER_PATH, "/auth/register");

const safeParseJSON = async (res) => {
  const text = await res.text().catch(() => "");
  try { return text ? JSON.parse(text) : null; } catch { return text || null; }
};

async function timedFetch(url, init = {}, { timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(new DOMException("Timeout","AbortError")), timeoutMs);
  try {
    const res = await fetch(url, { mode: "cors", credentials: "omit", ...init, signal: controller.signal });
    const data = await safeParseJSON(res);
    return { ok: res.ok, status: res.status, data, headers: res.headers };
  } catch (e) {
    return { ok: false, status: 0, data: { message: e?.message || "Network error" } };
  } finally {
    clearTimeout(id);
  }
}

async function postJSON(path, body, opts = {}) {
  return timedFetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, */*" },
    body: JSON.stringify(body || {}),
  }, opts);
}

export const apiAuth = {
  async register(form) {
    const trim = (v) => (typeof v === "string" ? v.trim() : v);

    // build EXACT body like Postman
    const body = {
      familyName: trim(form?.familyName),
      givenName:  trim(form?.givenName),
      gender:     trim(form?.gender), // "Male"/"Female"/"Other"
      username:   String(trim(form?.username) || "").replace(/\s+/g,"_").replace(/[^a-zA-Z0-9._]/g,"").toLowerCase(),
      email:      String(trim(form?.email) || "").toLowerCase(),
      password:   String(form?.password || ""),
      confirmedPassword: String(
        form?.confirmedPassword ??
        form?.confirmPassword ??
        form?.passwordConfirm ??
        form?.passwordConfirmation ??
        form?.password
      ),
    };

    // attempt 1
    let r = await postJSON(REGISTER_PATH, body);
    if (r.ok) return r;

    // fallback: enum uppercase
    if (!r.ok && (r.status === 400 || r.status === 422 || r.status === 500) && body.gender) {
      const G = String(body.gender).toUpperCase();
      if (["MALE","FEMALE","OTHER"].includes(G) && G !== body.gender) {
        r = await postJSON(REGISTER_PATH, { ...body, gender: G });
        if (r.ok) return r;
      }
    }

    // fallback: minimal when server is picky
    if (!r.ok && (r.status === 422 || r.status === 500)) {
      const minimal = {
        email: body.email,
        username: body.username,
        password: body.password,
        confirmedPassword: body.confirmedPassword,
      };
      const r2 = await postJSON(REGISTER_PATH, minimal);
      return r2.ok ? r2 : r;
    }

    return r;
  },
};
export default apiAuth;
