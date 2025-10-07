// src/pages/auth/LoginPage.jsx
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

import { z } from "zod";

/* ---------------- env + utils ---------------- */
const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_BASE_URL ||
  "http://localhost:4000"
).replace(/\/+$/, "");

const loginSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const safeParseJSON = async (res) => {
  const text = await res.text().catch(() => "");
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
};

/* ---------------- component ---------------- */
export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // success or error text

  const google = new GoogleAuthProvider();
  const github = new GithubAuthProvider();
  github.addScope("user:email");
  const facebook = new FacebookAuthProvider();
  facebook.addScope("email");

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  async function applyPersistence(rememberMe) {
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );
  }

  // USERNAME/PASSWORD -> API
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setMessage(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
        credentials: "omit",
      });

      const data = await safeParseJSON(res);

      if (!res.ok) {
        setMessage((data && (data.message || data.error)) || "Login failed");
        return;
      }

      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 800);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // OAUTH
  async function handleOAuth(which) {
    setMessage("");
    setLoading(true);
    try {
      await applyPersistence(remember);
      let result;
      if (which === "Google") result = await signInWithPopup(auth, google);
      if (which === "Facebook") result = await signInWithPopup(auth, facebook);
      if (which === "GitHub") result = await signInWithPopup(auth, github);
      if (!result) return;

      const user = result.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      const code = String(err?.code || "");
      if (code.includes("auth/popup-closed-by-user")) setMessage("Popup closed.");
      else if (code.includes("auth/operation-not-allowed"))
        setMessage("Provider disabled in Firebase.");
      else if (code.includes("auth/network-request-failed"))
        setMessage("Network error.");
      else setMessage(err?.message || "Social login failed.");
      console.error(`${which} OAuth error:`, err);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#1E40AF] flex justify-center items-center">
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-center w-full max-w-6xl px-4 sm:px-6 md:px-8">
        
        {/* Illustration */}
        <img
          src={loginImage}
          alt="Login Illustration"
          className="hidden lg:block lg:w-[500px] max-w-sm object-contain mr-0 lg:mr-12 mb-6 lg:mb-0"
        />

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] mx-auto"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Welcome
            </h1>
            <p className="mt-2 text-sm text-white/70">Log in to continue</p>
          </div>

          {message && (
            <div
              className={`mb-4 rounded-xl p-3 text-sm ${
                message.toLowerCase().includes("success")
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                  : "border border-red-500/30 bg-red-500/10 text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <Mail className="h-4 w-4" /> Username
              </span>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="your_username"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                autoComplete="username"
                required
              />
            </label>

            {/* Password */}
            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <Lock className="h-4 w-4" /> Password
              </span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
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
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            {/* Remember & Forgot */}
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
              <a
                href="#"
                className="text-white/80 underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
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

          {/* Social login */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60">OR</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          <div className="flex flex-col md:flex-row text-white gap-4">
            <button
              onClick={() => handleOAuth("Google")}
              disabled={loading}
              className="flex flex-col w-full md:w-1/3 items-center justify-center gap-3"
            >
              <FcGoogle className="h-12 w-12" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              onClick={() => handleOAuth("Facebook")}
              disabled={loading}
              className="flex flex-col w-full md:w-1/3 items-center justify-center gap-3"
            >
              <FaFacebook className="h-12 w-12 text-blue-400 bg-white rounded-full" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
            <button
              onClick={() => handleOAuth("GitHub")}
              disabled={loading}
              className="flex flex-col w-full md:w-1/3 items-center justify-center gap-3"
            >
              <FaGithub className="h-12 w-12 text-black bg-white rounded-full" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/70">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
