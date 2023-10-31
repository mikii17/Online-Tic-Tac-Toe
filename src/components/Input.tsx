import { useEffect, useState } from "react";
import useOnChange from "../hooks/useOnChange";

type InputProps = {
  children: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  id: string;
  name: string;
  type: string;
  required?: boolean;
};
const Input = (props: InputProps) => {
  const [val, setVal] = useOnChange("");
  let [labelClassName, setLabelClassName] = useState<string>("");
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  useEffect(() => {
    if (props.value != null) {
      setLabelClassName(
        `absolute ${
          isOnFocus || props.value !== "" ? "top-0" : "top-1/2"
        } -translate-y-1/2 text-skin-muted transition-all duration-200 ease-in`
      );
    } else {
      setLabelClassName(
        `absolute ${
          isOnFocus || val !== "" ? "top-0" : "top-1/2"
        } -translate-y-1/2 text-skin-muted transition-all duration-200 ease-in`
      );
    }
  }, [isOnFocus, props.value, val]);
  return (
    <div className="relative before:content-[''] before:w-full before:h-1 before:bg-skin-button-muted before:absolute before:bottom-[-4px]">
      <label htmlFor={props.id} className={labelClassName}>
        {props.children}
      </label>
      {props.value != null ? (
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onFocus={() => setIsOnFocus(true)}
          onBlur={() => setIsOnFocus(false)}
          onChange={props.onChange}
          required={props.required ?? true}
          className="w-full sm:w-80 outline-none bg-transparent text-skin-muted-button px-5 py-3"
        />
      ) : (
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          value={val}
          onFocus={() => setIsOnFocus(true)}
          onBlur={() => setIsOnFocus(false)}
          onChange={setVal}
          required={props.required ?? true}
          className=" w-full sm:w-96 outline-none bg-transparent text-skin-muted-button px-5 py-3"
        />
      )}
    </div>
  );
};

export default Input;
