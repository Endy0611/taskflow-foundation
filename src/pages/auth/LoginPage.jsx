import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, } from "react-icons/fa";
import loginImage from "../../assets/general/Login-pic.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      if (!email || !password) throw new Error("Please fill in all fields");
      alert(`Logged in as ${email}`);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const link = useNavigate();

  const handleOAuth = (provider) => {
    alert(`Continue with ${provider} clicked!`);
    // TODO: integrate with Firebase/Supabase/Auth0
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#1E40AF] flex">
      <div className="absolute inset-0" />
      <svg className="absolute -z-0 h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#goo)" }}
      >
        <motion.div
          className="absolute top-10 left-10 h-72 w-72 rounded-full mix-blend-screen blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #60a5fa55, #a78bfa33 45%, transparent 60%)",
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-20 h-80 w-80 rounded-full mix-blend-screen blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 70% 40%, #34d39955, #60a5fa33 50%, transparent 65%)",
          }}
          animate={{ x: [0, -30, 20, 0], y: [0, 25, -35, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #f472b655, #fbbf2433 50%, transparent 70%)",
          }}
          animate={{ x: [0, 20, -25, 0], y: [0, -30, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Form */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-6xl place-items-center px-4 flex justify-around">
        {/* Image section */}
        <img
          src={loginImage}
          alt="Login Illustration"
          className="hidden md:block w-[500px] max-w-sm object-contain"
        />


        {/* Form section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Welcome
            </h1>
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
                <Mail className="h-4 w-4" /> Email
              </span>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                  autoComplete="email"
                  required
                />
              </div>
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
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
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
                <>
                  <span onClick={()=> navigator("/WorkspaceSetting")}>Sign in</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60">OR</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Social logins - Updated to match the reference image */}
          <div className="flex text-white ">
            <button
              onClick={() => handleOAuth("Google")}
              className="flex flex-col w-full items-center justify-center gap-3"
            >
              <FcGoogle className="h-15 w-15" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              onClick={() => handleOAuth("Facebook")}
              className="flex flex-col w-full items-center justify-center gap-3"
            >
              <FaFacebook className="h-15 w-15 text-blue-400 bg-white rounded-full" />
              <span className="text-sm font-medium">Facebook</span>
            </button>

            <button
              onClick={() => handleOAuth("GitHub")}
              className="flex flex-col w-full items-center justify-center gap-3"
            >
              <FaGithub className="h-15 w-15 text-black rounded-full " />
              <span className="text-sm font-medium">Github</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/70">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-white underline-offset-4 hover:underline"
              onClick={()=> link("/register")}
            >
              Create one
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
