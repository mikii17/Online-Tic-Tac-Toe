import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import Loading from "./Loading";

export default function ProtectionLayout() {
  const user = useUser();
  const { pathname, state } = useLocation();
  let redirectTo = pathname;
  if (user === undefined) {
    // If user is still loading
    return <Loading />;
  }
  if (user === null) {
    // If user is not logged in
    if (pathname.startsWith("/game")) {
      // If user is trying to access /game
      redirectTo = redirectTo.replace("/game", "/join"); // Redirect to /join
    }
    redirectTo = btoa(redirectTo); // btoa() converts string to base-64
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }
  if (pathname.startsWith("/game")) {
    // If user is trying to access /game
    if (state?.from && state.from.startsWith("/join")) {
      // If user is coming from /join
      return <Outlet />;
    } else {
      // If user is not coming from /join, rather directly trying to access /game
      redirectTo = redirectTo.replace("/game", "/join"); // Redirect to /join
      return <Navigate to={redirectTo} replace />;
    }
  }
  return <Outlet />;
}
