interface Props {
  children: string;
}

const Heading = ({ children }: Props) => {
  return (
    <div className="text-center p-10 text-6xl font-extrabold bg-[#16dfde] w-screen h-50 border-4 border-black font-sofadi">
      {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#80feff] to-c2"> */}
      <span className="text-black">{children}</span>
    </div>
    //  text-center p-3
  );
};

export default Heading;
