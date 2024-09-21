import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ControlBar = ({ children }: Props) => {
  return <div className="flex flex-wrap justify-center">{children}</div>;
};

export default ControlBar;
