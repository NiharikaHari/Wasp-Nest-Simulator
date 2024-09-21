import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <div className="flex flex-row rounded-md bg-[#ffec4b] h-screen">
      {children}
    </div>
  );
};

export default Main;
