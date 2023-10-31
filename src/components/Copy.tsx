import { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import copy from '../assets/copy.svg';

const Copy = ({copyMsg}: {copyMsg: string}) => {
    const [copyed, setCopyed] = useState(false);
  const copyLink = (copyMsg: string) => {
    navigator.clipboard.writeText(copyMsg);
    toast.success('Copyed to clipboard.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        className: `bg-[rgb(var(--color-text-base))] text-skin-muted`
    });
    setCopyed(true);
    setTimeout(() => {
        setCopyed(false)
    },3200)
  };
  return (
    <>
        <ToastContainer transition={Slide} />
        <button className={`flex gap-3 items-center`} disabled={copyed} onClick={() => copyLink(copyMsg)}>
        <img className="w-6 h-6 sm:w-8 sm:h-8" src={copy} alt="copy icon" />
        <p className={`${copyed ? "text-skin-base" : "text-skin-muted-button"} transition-all duration-100 ease-in-out`}>{copyed ? "Copyed! ✅" : "Copy"}</p>
        </button>
    </>
  );
};

export default Copy;
