import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Implement/firebase/firebase-config";
import NavbarB4Login from "../nav&footer/NavbarB4Login";
import NavbarComponent from "../nav&footer/NavbarComponent";

export default function DynamicNavbar({
  darkMode,
  toggleDarkMode,
  sidebarOpen,
  setSidebarOpen,
  setShowModal,
}) {
  const [user, setUser] = useState(null);

  // ✅ Detect both Firebase and localStorage logins
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "User",
          email:
            firebaseUser.email && firebaseUser.email.includes("@")
              ? firebaseUser.email
              : `${firebaseUser.displayName || "user"}@gmail.com`,
          photoURL: firebaseUser.photoURL || null,
          provider: firebaseUser.providerData?.[0]?.providerId || "local",
        };

        // ✅ Save as "active user"
        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ Also store in accounts list (for switch account feature)
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        const exists = accounts.some((a) => a.email === userData.email);
        if (!exists) {
          accounts.push(userData);
          localStorage.setItem("accounts", JSON.stringify(accounts));
        }

        setUser(userData);
      } else {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      }
    });

    // ✅ Listen for profile updates or manual logout (from other tabs)
    const handleStorage = () => {
      const updated = localStorage.getItem("user");
      setUser(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      unsub();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // ✅ Handle logout (also clear active user)
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase logout error:", err);
    }

    // Keep other saved accounts, just clear active user
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Sync live updates from Profile page (photo/name changes)
  useEffect(() => {
    const syncProfile = () => {
      const updated = JSON.parse(localStorage.getItem("user") || "null");
      if (updated) setUser(updated);
    };
    window.addEventListener("profile-updated", syncProfile);
    return () => window.removeEventListener("profile-updated", syncProfile);
  }, []);

  // ✅ Render based on login state
  if (!user) {
    return (
      <NavbarB4Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    );
  }

  return (
    <NavbarComponent
      user={user}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      setShowModal={setShowModal}
      onLogout={handleLogout}
    />
  );
}
