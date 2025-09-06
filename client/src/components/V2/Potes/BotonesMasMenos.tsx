import { useState } from "react";

const BotonesMasMenos = ({ mas, menos }: { mas: any; menos: any }) => {
  const [presionadoMas, setPresionadoMas] = useState(false);
  const [presionadoMenos, setPresionadoMenos] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setPresionadoMas(true);
          setTimeout(() => setPresionadoMas(false), 150);
          mas();
        }}
        className={`mb-3 transition-all duration-100 bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center ${
          presionadoMas ? 'scale-90' : 'scale-100'
        }`}
      >
        <h2 className="mb-1">+</h2>
      </button>
      <button
        onClick={() =>{ 
           setPresionadoMenos(true);
          setTimeout(() => setPresionadoMenos(false), 150);
          menos()}}
         className={` transition-all duration-100 bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center ${
          presionadoMenos ? 'scale-90' : 'scale-100'
        }`}
      >
        <h2 className="mb-1">-</h2>
      </button>
    </>
  );
};

export default BotonesMasMenos;
