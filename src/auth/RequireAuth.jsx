import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/me", {
      credentials: "include", // ✅ send cookie
    })
      .then((res) => {
        setAllowed(res.ok);
        setChecking(false);
      })
      .catch(() => {
        setAllowed(false);
        setChecking(false);
      });
  }, []);

  if (checking) return null; // or spinner
  if (!allowed) return <Navigate to="/" replace />;

  return children;
}
