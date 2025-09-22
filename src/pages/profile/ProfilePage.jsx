// src/pages/profile/ProfilePage.jsx
import React, { useRef, useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import NavbarComponent from "../../components/nav&footer/NavbarComponent";

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: "Mon",
    lastName: "Sreynet",
    username: "Sreynet168",
    email: "monsreynet@gmail.com",
    bio: "",
  });

  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1544006659-f0b21884ced1?q=80&w=640&auto=format&fit=crop"
  );

  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePickFile = () => fileRef.current?.click();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit", form);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <NavbarComponent />

      {/* HEADER (in container) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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

      {/* CONTENT (full-height feel, but inside container) */}
      <form
        onSubmit={onSubmit}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* PHOTO CARD */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

          {/* FORM CARD */}
          <section className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
              <Field
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
              />
              <Field
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Bio"
                  name="bio"
                  rows={5}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about you"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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

/* small inputs */
function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-orange-500/0 transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
      />
    </label>
  );
}
function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
      />
    </label>
  );
}
