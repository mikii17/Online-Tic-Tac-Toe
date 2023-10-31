import { Form, Link, useActionData, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { isUsernameAvailable } from "../../context/AuthContext";
import { useEffect } from "react";

import logo from "../../assets/logoSVG.svg";
import Input from "../../components/Input";

type ActionReturnType = {
  error: string | null;
  redirect: true | null;
} | null;

export const action = async (
  signup: (email: string, password: string, username: string) => Promise<void>,
  request: Request
) => {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  if (email === null)
    return {
      error: "Email is required",
    };
  if (password === null)
    return {
      error: "Password is required",
    };
  if (username === null)
    return {
      error: "Username is required",
    };
  if (confirmPassword === null)
    return {
      error: "Confirm Password is required",
    };
  if (password !== confirmPassword)
    return {
      error: "Passwords do not match",
    };
  try{
    const usernameAvailable = await isUsernameAvailable(username);
    if (!usernameAvailable)
      return {
        error: "Username is not available",
      };
    await signup(email, password, username);
    console.log("signup!!")
    return {
      redirect: true,
    };
  }
  catch(error: any){
    if (error.code === "auth/email-already-in-use")
      return {
        error: "Email is already in use",
      };
    return {
      error: "Something went wrong",
    };
  }
};

const Signup = () => {
  const { state } = useNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectToSearchParam = searchParams.get("redirectTo");
  const redirectTo = redirectToSearchParam !== null ? atob(redirectToSearchParam) : "/"; // atob() converts base-64 to string
 
  const actionResult = useActionData() as ActionReturnType;

  console.log(state, actionResult);

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
        <Input id="username" name="username" type="text">Username</Input>
        <Input id="email" name="email" type="email">Email</Input>
        <Input id="password" name="password" type="password">Password</Input>
        <Input id="confirmPassword" name="confirmPassword" type="password">Confirm Password</Input>
        {/* <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div> */}
        {/* <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />
        </div> */}
        <button disabled={state === "submitting"} className="relative px-10 py-4 rounded-md text-skin-muted-button bg-skin-button-base transition-all duration-300 ease-in-out
                    hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-base hover:via-hue-base hover:to-hue-base bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
                    before:w-0 before:bg-skin-button-muted/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md">
          {state === "submitting" ? "Signup...." : "Signup"}
        </button>
      </Form>
      <Link to={`/login${redirectToSearchParam ? `?redirectTo=${redirectToSearchParam}` : ""}`} className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline">Don't have an account?</Link>
    </main>
  );
};

export default Signup;
