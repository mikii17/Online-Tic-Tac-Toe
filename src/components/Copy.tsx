import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import copy from "../assets/copy.svg";

const Copy = ({ copyMsg }: { copyMsg: string }) => {
  const [copied, setCopied] = useState(false);
  const copyLink = (copyMsg: string) => {
    navigator.clipboard.writeText(copyMsg);
    toast.success("Copied to clipboard.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      className: `bg-[rgb(var(--color-text-base))] text-skin-muted`,
    });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3200);
  };
  return (
    <>
      <ToastContainer transition={Slide} />
      <button
        className={`flex gap-2 sm:gap-3 items-center`}
        disabled={copied}
        onClick={() => copyLink(copyMsg)}
      >
        <img className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" src={copy} alt="copy icon" />
        <p
          className={`text-sm sm:text-base lg:text-md ${
            copied ? "text-skin-base" : "text-skin-muted-button"
          } transition-all duration-100 ease-in-out`}
        >
          {copied ? "Copied! ✅" : "Copy"}
        </p>
      </button>
    </>
  );
};

export default Copy;
