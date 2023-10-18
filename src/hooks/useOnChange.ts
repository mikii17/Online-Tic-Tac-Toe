import { useState } from "react";

type returnType = [string, (e: React.ChangeEvent<HTMLInputElement>) => void];

export default function useOnChange(
  initialValue: string | undefined
): returnType {
  const [value, setValue] = useState(initialValue || "");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handleOnChange];
}
