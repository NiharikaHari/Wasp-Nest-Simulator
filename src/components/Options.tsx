import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Options = ({ children }: Props) => {
  return (
    <div className="w-1/4 h-auto border-4 border-black p-10">{children}</div>
  );
};

export default Options;
