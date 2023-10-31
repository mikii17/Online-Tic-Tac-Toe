import { useState } from 'react';
import copy from '../assets/copy.svg';

const Copy = ({copyMsg}: {copyMsg: string}) => {
    const [copyed, setCopyed] = useState(false);
  const copyLink = (copyMsg: string) => {
    navigator.clipboard.writeText(copyMsg);
    setCopyed(true);
    setTimeout(() => {
        setCopyed(false)
    },3000)
  };
  return (
    <button className="flex gap-3 items-center" disabled={copyed} onClick={() => copyLink(copyMsg)}>
      <img className="w-6 h-6 sm:w-8 sm:h-8" src={copy} alt="copy icon" />
      <p className={`${copyed ? "text-skin-base" : "text-skin-muted-button"}`}>{copyed ? "Copyed! ✅" : "Copy"}</p>
    </button>
  );
};

export default Copy;
