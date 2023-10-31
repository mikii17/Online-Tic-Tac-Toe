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
    <main className="min-h-screen flex flex-col justify-center items-center gap-8 sm:gap-9 lg:gap-10">
     <Link to="/">
        <img src={logo} alt="logo" className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60" />
      </Link>
      <h1 className="font-bold text-2xl sm:text-3xl xl:text-4xl">Login</h1>
      <Form method="POST" className="flex flex-col gap-9 items-center">
        {state === "idle" && actionResult?.error !== null && (
          <p className="text-red-600 text-lg">{actionResult?.error}</p>
        )}
        <Input id="email" name="email" type="email">Email</Input>
        
        <Input id="password" name="password" type="password">Password</Input>
        
        <button disabled={state === "submitting"} className="relative px-8 py-3 sm:px-9 sm:py-3 lg:px-10 lg:py-3 text-sm sm:text-base lg:text-lg rounded-md text-skin-muted-button bg-skin-button-base transition-all duration-300 ease-in-out
                    hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-base hover:via-hue-base hover:to-hue-base bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
                    before:w-0 before:bg-skin-button-muted/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md">
          {state === "submitting" ? "Login....." : "Login"}
        </button>
      </Form>
      <Link to={`/signup${redirectToSearchParam ? `?redirectTo=${redirectToSearchParam}` : ""}`} className="text-skin-muted-button text-sm sm:text-base md:text-lg hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline">Don't have an account?</Link>
    </main>
  );
};

export default Login;
