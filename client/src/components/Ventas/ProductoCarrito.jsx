import React from "react";
import Bton_eliminar_producto from "./Bton_eliminar_producto";
import DerretidoVainilla2 from "../apariencia/DerretidoVainilla2";
import { writeLocalStorage } from "../../hooks/useLocalStorage";
import { precioMoneda } from "../Comprar/SeccionAgregar/Entrega/precioMoneda";

const ProductoCarrito = ({
  sabor,
  setCarrito,
  carrito,
  total_sabor,
  right,
  metoPago,
}) => {
  const handleEliminar = (id) => {
    const deleteSabor = carrito.filter((sabor) => sabor.id_sabor !== id);
    setCarrito(deleteSabor);
    writeLocalStorage("sabores", deleteSabor);
  };

  return (
    <>
      <section
        key={sabor.id_sabor}
        className={`flex p-1 rounded-xl mb-4 items-center mx-2`}
        style={{ backgroundColor: "#" + sabor.color }}
      >
        <div
          className={`flex justify-center rounded-full w-16 h-16 m-2 bg-neutral-200`}
        >
          <h3 className="flex font-bold justify-center text-4xl items-center ">
            {sabor.cantidad}
          </h3>
        </div>
        <div className="p-2">
          <h2 className="text-3xl font-semibold font-irish">
            {sabor.nombre_sabor}
          </h2>

          <div className="flex gap-4">
            {" "}
            <h3 className="text-sm font-semibold">
              Precio: {sabor.precio_venta} {precioMoneda(metoPago)}
              
            </h3>
            <h3 className="text-sm font-semibold">Total: {total_sabor}</h3>
          </div>
        </div>
        <button onClick={() => handleEliminar(sabor.id_sabor)}>
          {" "}
          <Bton_eliminar_producto />
        </button>
      </section>
      <div className={`relative bottom-4 left-${right}`}>
        <DerretidoVainilla2 color={"#" + sabor.color} />
      </div>
    </>
  );
};

export default ProductoCarrito;
