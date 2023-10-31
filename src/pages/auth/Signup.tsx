import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { isUsernameAvailable, useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

import logo from "../../assets/logoSVG.svg";
import Input from "../../components/Input";
import useOnChange from "../../hooks/useOnChange";

type ActionReturnType = {
  error: string | null;
  redirect: true | null;
} | null;

// export const action = async (
//   signup: (email: string, password: string, username: string) => Promise<void>,
//   request: Request
// ) => {
//   const formData = await request.formData();
//   const username = formData.get("username") as string | null;
//   const email = formData.get("email") as string | null;
//   const password = formData.get("password") as string | null;
//   const confirmPassword = formData.get("confirmPassword") as string | null;

//   if (email === null)
//     return {
//       error: "Email is required",
//     };
//   if (password === null)
//     return {
//       error: "Password is required",
//     };
//   if (username === null)
//     return {
//       error: "Username is required",
//     };
//   if (confirmPassword === null)
//     return {
//       error: "Confirm Password is required",
//     };
//   if (password !== confirmPassword)
//     return {
//       error: "Passwords do not match",
//     };
//   try {
//     const usernameAvailable = await isUsernameAvailable(username!);
//     if (!usernameAvailable)
//       return {
//         error: "Username is not available",
//       };

//     return await signup(email!, password!, username!).then(() => {
//       console.log("signup!!");
//       return {
//         redirect: true,
//         };
//     } ).catch((error) => {
//         if (error.code === "auth/email-already-in-use")
//         return {
//           error: "Email is already in use",
//         };
//       return {
//         error: "Something went wrong",
//       };
//     });

//     // console.log("signup!!");
//     // return {
//     //   redirect: true,
//     // };
//   } catch (error: any) {
//     if (error.code === "auth/email-already-in-use")
//       return {
//         error: "Email is already in use",
//       };
//     return {
//       error: "Something went wrong",
//     };
//   }
//   // return {
//   //   redirect: true,
//   // };
// };
const validateAndSignup = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  signup: (email: string, password: string, username: string) => Promise<void>,
  setFormState: React.Dispatch<React.SetStateAction<"idle" | "submitting">>,
  setFormResult: React.Dispatch<React.SetStateAction<ActionReturnType>>
) => {
  setFormState("submitting");
  if (email === null) {
    setFormResult({
      error: "Email is required",
      redirect: null,
    });
    setFormState("idle");
    return;
  }
  if (password === null) {
    setFormResult({
      error: "Password is required",
      redirect: null,
    });
    setFormState("idle");
    return;
  }
  if (username === null) {
    setFormResult({
      error: "Username is required",
      redirect: null,
    });
    setFormState("idle");
    return;
  }
  if (confirmPassword === null) {
    setFormResult({
      error: "Confirm Password is required",
      redirect: null,
    });
    setFormState("idle");
    return;
  }
  if (password !== confirmPassword) {
    setFormResult({
      error: "Passwords do not match",
      redirect: null,
    });
    setFormState("idle");
    return;
  }
  try {
    const usernameAvailable = await isUsernameAvailable(username!);
    if (!usernameAvailable) {
      setFormResult({
        error: "Username is not available",
        redirect: null,
      });
      setFormState("idle");
      return;
    }

    await signup(email!, password!, username!);
    console.log("signup!!");
    setFormResult({
      redirect: true,
      error: null,
    });
    setFormState("idle");
    return;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      setFormResult({
        error: "Email is already in use",
        redirect: null,
      });
      setFormState("idle");
      return;
    }
    setFormResult({
      error: "Something went wrong",
      redirect: null,
    });
    setFormState("idle");
    return;
  }
};
const Signup = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useOnChange("");
  const [email, setEmail] = useOnChange("");
  const [password, setPassword] = useOnChange("");
  const [confirmPassword, setConfirmPassword] = useOnChange("");
  const [formState, setFormState] = useState<"idle" | "submitting">("idle");
  const [formResult, setFormResult] = useState<ActionReturnType>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectToSearchParam = searchParams.get("redirectTo");
  const redirectTo =
    redirectToSearchParam !== null ? atob(redirectToSearchParam) : "/"; // atob() converts base-64 to string

  useEffect(() => {
    if (formResult && formResult.redirect) {
      navigate(redirectTo, { replace: true });
    }
  }, [formResult?.redirect]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52" />
      </Link>
      <h1 className="font-bold text-2xl sm:text-3xl">
        Signup
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validateAndSignup(
            username,
            email,
            password,
            confirmPassword,
            signup,
            setFormState,
            setFormResult
          );
        }}
        className="flex flex-col gap-9 items-center"
      >
        {formState === "idle" && formResult?.error !== null && (
          <p className="text-red-600 text-lg">{formResult?.error}</p>
        )}
        <Input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={setUsername}
        >
          Username
        </Input>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
        >
          Email
        </Input>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
        >
          Password
        </Input>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        >
          Confirm Password
        </Input>
        <button
          disabled={formState === "submitting"}
          className="relative px-8 py-3 sm:px-9 sm:py-3 text-sm sm:text-base rounded-md text-skin-muted-button bg-skin-button-base transition-all duration-300 ease-in-out
                    hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-base hover:via-hue-base hover:to-hue-base bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
                    before:w-0 before:bg-skin-button-muted/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md"
        >
          {formState === "submitting" ? "Signup...." : "Signup"}
        </button>
      </form>
      <Link
        to={`/login${
          redirectToSearchParam ? `?redirectTo=${redirectToSearchParam}` : ""
        }`}
        className="text-skin-muted-button text-sm sm:text-base 
hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline"
      >
        Don't have an account?
      </Link>
    </main>
  );
};

export default Signup;
