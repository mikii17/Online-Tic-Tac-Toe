import { Link } from "react-router-dom";

import logo from "../assets/logoSVG.svg";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-8 sm:gap-9 lg:gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52" />
      </Link>
      <h1 className="font-bold text-2xl sm:text-3xl">404 Not Found</h1>
      <p className="px-5 text-center text-skin-muted text-base md:text-lg leading-8 sm:max-w-xl lg:max-w-3xl ">
        Either there’s a tear in the matrix or the page you’re looking for no
        longer exists
      </p>
      <Link
        to="/"
        className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline"
      >
        Go to home
      </Link>
    </main>
  );
};

export default NotFound;
