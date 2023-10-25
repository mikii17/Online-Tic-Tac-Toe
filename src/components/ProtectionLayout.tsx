import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

export default function ProtectionLayout() {
  const user = useUser();
  if (user === undefined) {
    return <p>Loading...</p>;
  }
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
