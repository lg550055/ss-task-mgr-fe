"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setLoggedIn(!!token);
    }
  }, []);

  const handleClick = () => {
    if (loggedIn) {
      localStorage.removeItem("token");
      setLoggedIn(false);
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
