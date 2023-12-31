import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Create from "./pages/Create";
import Join, { action as joinAction } from "./pages/Join";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login, { action as loginAction } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/404";


// Components
import ProtectionLayout from "./components/ProtectionLayout";

// Context
import { useAuth } from "./context/AuthContext";

function App() {
  const { login, user } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* If main has same styling for each route then use MainLayout */}
        <Route index element={<Home />} />
        <Route
          path="login"
          element={<Login />}
          action={({ request }: { request: Request }) =>
            loginAction(login, request)
          }
        />
        <Route
          path="signup"
          element={<Signup />}
          // action={({ request }: { request: Request }) =>
          //   signupAction(signup, request)
          // }
        />
        {/* Protect routes with ProtectionLayout */}
        <Route element={<ProtectionLayout />}>
          <Route path="create" element={<Create />} />
          <Route path="join" action={({ request } : {request: Request}) => joinAction(request, user?.username!)} element={<Join />} />
          <Route path="join/:roomId" action={({ request }: {request: Request}) => joinAction(request, user?.username!)} element={<Join />} />
          <Route path="game/:roomId" element={<Game />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
