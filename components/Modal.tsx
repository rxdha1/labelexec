import { X } from "lucide-react";
import React, { ReactNode } from "react";

interface IModal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: () => any;
  children: ReactNode;
  className?: string;
  containerClasses?: string;
}

const Modal = ({ children, onClose, className, containerClasses }: IModal) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    className={`fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center bg-[#6262626b] bg-[url('/circle.png')] bg-center bg-cover px-3 md:px-0 ${className || ""}`}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick={(e: any) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div
      className={`relative z-[2] max-h-[95%] md:max-h-[85%] overflow-y-auto rounded-2xl md:rounded-md w-full md:w-[500px] bg-background border-grey border px-4 py-3 md:p-4 ${containerClasses}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 md:right-2 top-2 block md:hidden"
      >
        <X className="size-5 md:size-6" />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
