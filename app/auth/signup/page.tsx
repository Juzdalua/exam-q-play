"use client";

import { useState } from "react";

export default function Login() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "password" }),
    });

    const data = await res.json();
    if (data.success) {
      setToken(data.token);
      alert("Login successful!");
    } else {
      alert("Login failed!");
    }
  };

  const fetchProtectedData = async () => {
    const res = await fetch("/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={fetchProtectedData} disabled={!token}>
        Fetch Protected Data
      </button>
    </div>
  );
}
