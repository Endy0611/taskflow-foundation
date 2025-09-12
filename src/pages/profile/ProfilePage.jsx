import React, { useRef, useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";

/**
 * ProfilePage.jsx
 * Single-file React component styled with Tailwind CSS.
 * Drop into your project and route to <ProfilePage />.
 */
export default function ProfilePage() {
  // --- demo initial state ---
  const [form, setForm] = useState({
    firstName: "Mon",
    lastName: "Sreynet",
    username: "Sreynet168",
    email: "monsreynet@gmail.com",
    bio: "",
  });

  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640&auto=format&fit=crop"
  );

  // no TS generics in .jsx
  const fileRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handlePickFile() {
    fileRef.current?.click();
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  }

  function onSubmit(e) {
    e.preventDefault();
    // TODO: replace with your API call
    console.log("submit", form);
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Top bar */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <button
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700"
          onClick={() => window.history.back()}
          type="button"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <h1 className="mt-4 text-2xl font-semibold">Edit Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep your details private. Information you add here.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-6xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Photo card */}
          <section className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-56 w-56 rounded-full object-cover ring-4 ring-orange-500"
                />
                <button
                  type="button"
                  onClick={handlePickFile}
                  className="absolute bottom-2 right-2 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow ring-1 ring-slate-200 hover:bg-white"
                >
                  <Camera className="h-4 w-4" />
                  <span>Photo</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </div>
              <p className="mt-3 text-xs text-slate-500">Photo</p>
              <p className="mt-1 text-sm font-medium">
                {form.firstName} {form.lastName}
              </p>
            </div>
          </section>

          {/* Form fields */}
          <section className="md:col-span-2 rounded-2xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-orange-500/0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="First name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-orange-500/0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Last name"
                />
              </div>

              {/* Username */}
              <div>
                <label className="mb-1 block text-sm font-medium">Username</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-orange-500/0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Username"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-orange-500/0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="email@example.com"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Tell us a bit about you"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => (window.location.href = "/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                Save
              </button>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
