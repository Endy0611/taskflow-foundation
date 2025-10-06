import { useEffect, useState } from "react";
import NavbarB4Login from "../nav&footer/NavbarB4Login";
import NavbarComponent from "../nav&footer/NavbarComponent";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Implement/firebase/firebase-config";

export default function DynamicNavbar({
  darkMode,
  toggleDarkMode,
  sidebarOpen,
  setSidebarOpen,
  setShowModal,
}) {
  const [user, setUser] = useState(null);

  // ✅ detect Firebase + localStorage login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
  name:
    firebaseUser.displayName ||
    firebaseUser.email?.split("@")[0] ||
    "User",
  email:
    firebaseUser.email?.includes("@")
      ? firebaseUser.email
      : `${firebaseUser.email || firebaseUser.displayName || "user"}@gmail.com`, // ✅ convert to Gmail
  photoURL: firebaseUser.photoURL || null,
  provider: firebaseUser.providerData?.[0]?.providerId || "local",
};

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      }
    });

    // ✅ also detect manual logout
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

  // ✅ handle logout fully
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase logout error:", err);
    }
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ decide which navbar to show
  if (!user) {
    return <NavbarB4Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
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
