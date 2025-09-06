import React from "react";

const CardCategoriasSelectorHome = ({
  image,
  titulo,
}: {
  image: string;
  titulo: string;
}) => {
  return (
   <div className="flex flex-col items-center"> <div className="relative bg-neutral-200 rounded-xl p-0.5 w-20 h-20 shadow-md">
      <img
        className="rounded-xl object-cover w-full h-full"
        src={`/images/categorias/${image}`}
        alt={titulo}
      />
      
    </div>
    <h2 className="bg-fresa shadow-md text-sm rounded-2xl font-bold w-20 mt-2 px-2 border border-slate-400/25 py-0.5   flex justify-center">
        {titulo}
      </h2></div>
  );
};

export default CardCategoriasSelectorHome;
