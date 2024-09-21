import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Simulation = ({ children }: Props) => {
  return (
    <div className="flex-basis-3/4 w-3/4 border-4 border-black">{children}</div>
  );
};

export default Simulation;
