import { Link } from "react-router-dom";

import logo from "../assets/logoSVG.svg";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-44 h-44 lg:w-60 lg:h-60 " />
      </Link>
      <h1 className="font-bold text-4xl sm:text-5xl">404 Not Found</h1>
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
