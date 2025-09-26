import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import loginImage from "../../assets/general/Login-pic.png";

import {
  auth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "../../Implement/firebase/firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { API_BASE, LOGIN_PATH, REGISTER_PATH } from "../../Implement/api";

/* ---------------- utils ---------------- */
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
  } finally { clearTimeout(id); }
}
function deepFindToken(obj) {
  if (!obj || typeof obj !== "object") return null;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") {
      const key = k.toLowerCase();
      if (key === "token" || key === "access_token" || key === "jwt" || key.endsWith("token") || /^eyJ/.test(v)) return v;
    }
    if (v && typeof v === "object") { const t = deepFindToken(v); if (t) return t; }
  }
  return null;
}
function extractToken(resp) {
  const t = deepFindToken(resp?.data);
  if (t) return t;
  try {
    const auth = resp?.headers?.get?.("authorization") || resp?.headers?.get?.("Authorization");
    const m = auth && /Bearer\s+(.+)/i.exec(auth);
    if (m) return m[1];
  } catch {}
  return null;
}
async function loginToApiSmart(identity, password) {
  const headers = { "Content-Type": "application/json", Accept: "application/json, */*" };
  const body = JSON.stringify({ email: identity, password }); // your API accepts email or username here

  // try cookie-mode first
  const cookieTry = await timedFetch(`${API_BASE}${LOGIN_PATH}`, {
    method: "POST", headers, body, credentials: "include",
  });
  if (cookieTry.ok) return cookieTry;

  // then bearer-mode
  return timedFetch(`${API_BASE}${LOGIN_PATH}`, {
    method: "POST", headers, body, credentials: "omit",
  });
}
async function fetchGithubPrimaryEmail(accessToken) {
  if (!accessToken) return null;
  try {
    const r = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `token ${accessToken}`, Accept: "application/vnd.github+json" },
    });
    if (!r.ok) return null;
    const emails = await r.json();
    const primary = emails?.find((e) => e?.primary && e?.verified)?.email;
    return primary || emails?.find((e) => e?.verified)?.email || emails?.[0]?.email || null;
  } catch { return null; }
}
async function authAgainstBackend({ email, usernameSeed, uid }) {
  const base = (usernameSeed || "").trim() || (email?.split("@")[0]) || (uid?.slice(0,8)) || "user";
  const username = base.replace(/\W+/g, "_").slice(0,20).toLowerCase() || `u_${(uid||"").slice(0,8)}`;
  const password = String(uid || "oauth_pass");
  const emailFinal = (email || `${uid}@oauth.local`).toLowerCase();

  const login1 = await timedFetch(`${API_BASE}${LOGIN_PATH}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailFinal, password }), credentials: "include",
  });
  if (login1.ok) return { token: extractToken(login1) };

  if ([401,404,409,422].includes(login1.status)) {
    const reg = await timedFetch(`${API_BASE}${REGISTER_PATH}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username, email: emailFinal, password,
        confirmedPassword: password, confirmed_password: password, password_confirmation: password,
      }),
      credentials: "include",
    });
    if (reg.ok) {
      const t = extractToken(reg);
      if (t) return { token: t };
      const login2 = await timedFetch(`${API_BASE}${LOGIN_PATH}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFinal, password }), credentials: "include",
      });
      if (login2.ok) return { token: extractToken(login2) };
    }
  }
  return { token: null };
}
function mapBackendError(status, data) {
  const msg = (typeof data?.message === "string" && data.message) || (typeof data?.error === "string" && data.error) || "";
  if (status === 400 || status === 401) return msg || "Invalid email or password.";
  if (status === 404) return "Account not found.";
  if (status === 429) return "Too many attempts. Please wait a bit.";
  if (status >= 500) return "Server error. Try again later.";
  return msg || `Login failed (HTTP ${status}).`;
}

/* ---------------- component ---------------- */
export default function LoginPage() {
  const navigate = useNavigate();

  const [identity, setIdentity] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const google = new GoogleAuthProvider();
  const github = new GithubAuthProvider(); github.addScope("user:email");
  const facebook = new FacebookAuthProvider(); facebook.addScope("email");

  async function applyPersistence(rememberMe) {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  }

  // EMAIL/PASSWORD -> BACKEND ONLY
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await loginToApiSmart(identity.trim().toLowerCase(), password);
      if (!r.ok) {
        setError(mapBackendError(r.status, r.data));
        return;
      }

      // ✅ Treat any 200 as success. Use token if provided; else mark cookie session.
      const token = extractToken(r);
      if (token) localStorage.setItem("token", token);
      localStorage.setItem("session", "ok");

      navigate("/app", { replace: true });
    } catch (err) {
      setError(err?.message || "Network error.");
    } finally {
      setLoading(false);
    }
  }

  // OAUTH
  async function handleOAuth(which) {
    setError("");
    setLoading(true);
    try {
      await applyPersistence(remember);
      let result;
      if (which === "Google")   result = await signInWithPopup(auth, google);
      if (which === "Facebook") result = await signInWithPopup(auth, facebook);
      if (which === "GitHub")   result = await signInWithPopup(auth, github);
      if (!result) return;

      let userEmail = result.user?.email || null;
      if (!userEmail && which === "GitHub") {
        const cred = GithubAuthProvider.credentialFromResult(result);
        userEmail = await fetchGithubPrimaryEmail(cred?.accessToken || null);
      }

      const { token } = await authAgainstBackend({
        email: userEmail, usernameSeed: result.user?.displayName, uid: result.user?.uid,
      });
      if (token) localStorage.setItem("token", token);
      localStorage.setItem("session", "ok");

      navigate("/app", { replace: true });
    } catch (err) {
      const code = String(err?.code || "");
      if (code.includes("auth/popup-closed-by-user")) setError("Popup closed.");
      else if (code.includes("auth/operation-not-allowed")) setError("Provider disabled in Firebase.");
      else if (code.includes("auth/network-request-failed")) setError("Network error.");
      else setError("Social login failed.");
      console.error(`${which} OAuth error:`, err);
    } finally { setLoading(false); }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#1E40AF] flex">
      {/* background blobs omitted for brevity */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-6xl place-items-center px-4 flex justify-around">
        <img src={loginImage} alt="Login Illustration" className="hidden md:block w-[500px] max-w-sm object-contain" />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Welcome</h1>
            <p className="mt-2 text-sm text-white/70">Log in to continue</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <Mail className="h-4 w-4" /> Email or Username
              </span>
              <input
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="you@example.com or yourname"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                autoComplete="username"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <Lock className="h-4 w-4" /> Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                  autoComplete="current-password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-white/10 text-white focus:ring-white/50"
                />
                Remember me
              </label>
              <a href="#" className="text-white/80 underline-offset-4 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/90 px-4 py-3 font-semibold text-gray-900 shadow-lg shadow-black/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-transparent" />
                  Logging in…
                </span>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Socials */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60">OR</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          <div className="flex text-white">
            <button onClick={() => handleOAuth("Google")} disabled={loading} className="flex flex-col w-full items-center justify-center gap-3">
              <FcGoogle className="h-12 w-12" /><span className="text-sm font-medium">Google</span>
            </button>
            <button onClick={() => handleOAuth("Facebook")} disabled={loading} className="flex flex-col w-full items-center justify-center gap-3">
              <FaFacebook className="h-12 w-12 text-blue-400 bg-white rounded-full" /><span className="text-sm font-medium">Facebook</span>
            </button>
            <button onClick={() => handleOAuth("GitHub")} disabled={loading} className="flex flex-col w-full items-center justify-center gap-3">
              <FaGithub className="h-12 w-12 text-black bg-white rounded-full" /><span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/70">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-white underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
