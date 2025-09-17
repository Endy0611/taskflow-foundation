import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import registerImage from "../../assets/general/register-pic.png";
import { apiAuth } from "../../Implement/api.js";

const firstError = (d) => {
  if (!d) return null;
  if (typeof d === "string") return d;
  if (typeof d.message === "string") return d.message;
  if (typeof d.error === "string") return d.error;
  if (d.errors && typeof d.errors === "object") {
    const k = Object.keys(d.errors)[0];
    const v = d.errors[k];
    return Array.isArray(v) ? v[0] : String(v);
  }
  return null;
};
const isEmail = (v) => /\S+@\S+\.\S+/.test(String(v || ""));
const sanitizeUsername = (u) =>
  (String(u || "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._]/g, "").toLowerCase().slice(0, 32)) || "";
const passwordStrong = (p) =>
  typeof p === "string" && p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    givenName: "", familyName: "", gender: "", username: "",
    email: "", password: "", confirmedPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const cleanUsername = useMemo(() => sanitizeUsername(formData.username), [formData.username]);
  const cleanEmail    = useMemo(() => String(formData.email || "").trim().toLowerCase(), [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setFormData((p) => ({ ...p, username: sanitizeUsername(value) }));
    else if (name === "email") setFormData((p) => ({ ...p, email: value.trim() }));
    else setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const f = formData;
    if (!f.givenName || !f.familyName || !f.gender || !cleanUsername || !cleanEmail || !f.password || !f.confirmedPassword)
      return "Please fill in all fields.";
    if (!isEmail(cleanEmail)) return "Please enter a valid email address.";
    if (isEmail(cleanUsername)) return "Username cannot be an email address.";
    if (cleanUsername.length < 3) return "Username must be at least 3 characters (letters, numbers, . or _).";
    if (!passwordStrong(f.password)) return "Password must be 8+ chars with upper, lower, digit and symbol.";
    if (f.password !== f.confirmedPassword) return "Passwords don't match.";
    if (!["Male", "Female", "Other"].includes(f.gender)) return "Gender must be Male, Female or Other.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError(""); setOkMsg("");

    const v = validate();
    if (v) { setError(v); return; }

    setLoading(true);
    try {
      const res = await apiAuth.register({
        familyName: formData.familyName,
        givenName:  formData.givenName,
        gender:     formData.gender,
        username:   cleanUsername,
        email:      cleanEmail,
        password:   formData.password,
        confirmedPassword: formData.confirmedPassword,
      });
      console.log("Register response:", res?.data);

      if (res.ok) {
        setOkMsg(`Account created. You can now log in as "${cleanUsername}".`);
        setFormData((p) => ({ ...p, password: "", confirmedPassword: "" }));
      } else {
        const msg =
          firstError(res.data) ||
          (res.status === 409 && "Email or username already in use.") ||
          (res.status === 422 && "Invalid data. Please check all fields.") ||
          (res.status === 500 && "Server error while creating account. Try a stronger password or unique username/email.") ||
          `Registration failed (HTTP ${res.status})`;
        setError(msg);
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 bg-[#1E40AF]">
      <div className="relative z-10 flex w-full max-w-6xl items-center justify-center gap-24">
        <img src={registerImage} alt="Register Illustration" className="hidden lg:block w-[480px] max-w-md object-contain" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Register</h1>
            <p className="mt-2 text-sm text-white/70">Create new Account to use cool template</p>
          </div>

          {error && <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
          {okMsg && <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">{okMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><User className="h-4 w-4" /> Given Name</span>
              <input name="givenName" value={formData.givenName} onChange={handleChange} disabled={loading}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 disabled:opacity-60"
                placeholder="Ong" autoComplete="given-name" required />
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><User className="h-4 w-4" /> Family Name</span>
              <input name="familyName" value={formData.familyName} onChange={handleChange} disabled={loading}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 disabled:opacity-60"
                placeholder="Endy" autoComplete="family-name" required />
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><User className="h-4 w-4" /> Gender</span>
              <select name="gender" value={formData.gender} onChange={handleChange} disabled={loading}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/40 disabled:opacity-60" required>
                <option value="" disabled className="text-gray-400">Select gender</option>
                <option value="Male" className="text-black">Male</option>
                <option value="Female" className="text-black">Female</option>
                <option value="Other" className="text-black">Other</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><User className="h-4 w-4" /> Username</span>
              <input name="username" value={cleanUsername} onChange={handleChange} disabled={loading}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 disabled:opacity-60"
                placeholder="yourhandle" autoComplete="username" required />
              <p className="mt-1 text-xs text-white/60">Use letters, numbers, “.” or “_”. Don’t use an email here.</p>
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><Mail className="h-4 w-4" /> Email</span>
              <input type="email" name="email" value={cleanEmail} onChange={handleChange} disabled={loading}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 disabled:opacity-60"
                placeholder="you@example.com" autoComplete="email" required />
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><Lock className="h-4 w-4" /> Password</span>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} disabled={loading}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/50 outline-none transition focus:border-white/40 disabled:opacity-60"
                  placeholder="StrongP@ssw0rd1" autoComplete="new-password" minLength={8} required />
                <button type="button" onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-white/80"><Lock className="h-4 w-4" /> Confirmed Password</span>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmedPassword" value={formData.confirmedPassword} onChange={handleChange} disabled={loading}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/50 outline-none transition focus:border-white/40 disabled:opacity-60"
                  placeholder="Repeat password" autoComplete="new-password" minLength={8} required />
                <button type="button" onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            <button type="submit" disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/90 px-4 py-3 font-semibold text-gray-900 shadow-lg shadow-black/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-75">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-transparent" />
                  Processing…
                </span>
              ) : (<>Sign Up</>)}
            </button>

            <p className="mt-6 text-center text-sm text-white/70">
              Have Account?{" "}
              <a href="/login" className="font-medium text-white underline-offset-4 hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}