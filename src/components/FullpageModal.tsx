import { ReactNode } from "react";

const FullpageModal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="transition-all duration-150 ease-in absolute z-10 bg-black/80 flex flex-col justify-center items-center min-h-screen min-w-full">
      <div className="flex flex-col justify-center items-center gap-10">
        {children}
      </div>
    </div>
  );
};

export default FullpageModal;
