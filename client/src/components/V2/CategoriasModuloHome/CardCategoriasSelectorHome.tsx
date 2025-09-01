import React from "react";

const CardCategoriasSelectorHome = ({
  image,
  titulo,
}: {
  image: string;
  titulo: string;
}) => {
  return (
    <div className="relative bg-neutral-300 rounded-xl p-1 w-20 h-24 shadow-md">
      <img
        className="rounded-xl object-cover w-full h-full"
        src={`/images/categorias/${image}`}
        alt={titulo}
      />
      <h2 className="bg-fresa text-sm rounded-2xl font-bold w-16 px-2 border border-slate-400/25 py-0.5 absolute top-9 left-2 flex justify-center">
        {titulo}
      </h2>
    </div>
  );
};

export default CardCategoriasSelectorHome;
