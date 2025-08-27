"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { loggedIn, logout } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (loggedIn) {
      logout();
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
      <h3 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>Task App</h3>
      <button onClick={handleClick}>
        {loggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
