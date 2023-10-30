import { useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import logo from "../../assets/logoSVG.svg";
import Input from "../../components/Input";

type ActionReturnType =
  | {
      error: string | null;
      redirect: true | null;
    }
  | undefined;

export const action = async (
  login: (email: string, password: string) => Promise<void>,
  request: Request
) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (email === null)
    return {
      error: "Email is required",
    };
  if (password === null)
    return {
      error: "Password is required",
    };
  try {
    await login(email, password);
    return {
      redirect: true,
    };
  } catch (error: any) {
    if (error.code === "auth/invalid-login-credentials") {
      return {
        error: "Invalid login credentials",
      };
    }
    return {
      error: "Something went wrong",
    };
  }
};

const Login = () => {
  const { state } = useNavigation();
  const [searchParams] = useSearchParams();
  const redirectToSearchParam = searchParams.get("redirectTo");
  const redirectTo = redirectToSearchParam !== null ? atob(redirectToSearchParam) : "/"; // atob() converts base-64 to string
  const navigate = useNavigate();
  const actionResult = useActionData() as ActionReturnType ;
  useEffect(() => {
    if (actionResult && actionResult.redirect) {
      navigate(redirectTo, { replace: true });
    }
  }, [actionResult]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-44 h-44 lg:w-60 lg:h-60 " />
      </Link>
      <h1 className="font-bold text-4xl sm:text-5xl">Login</h1>
      <Form method="POST" className="flex flex-col gap-9 items-center">
        {state === "idle" && actionResult?.error !== null && (
          <p className="text-red-600 text-lg">{actionResult?.error}</p>
        )}
        <Input id="email" name="email" type="email">Email</Input>
        {/* <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div> */}
        <Input id="password" name="password" type="password">Password</Input>
        {/* <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div> */}
        <button disabled={state === "submitting"} className="px-10 py-4 rounded-md text-skin-muted-button bg-skin-button-base disabled:opacity-75">
          {state === "submitting" ? "Login....." : "Login"}
        </button>
      </Form>
      <Link to={`/signup${redirectToSearchParam ? `?redirectTo=${redirectToSearchParam}` : ""}`} className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline">Don't have an account?</Link>
    </main>
  );
};

export default Login;
