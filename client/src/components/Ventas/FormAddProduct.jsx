import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useSabores } from "../../context/SaboresProvider";
import { precioMoneda } from "../Comprar/SeccionAgregar/Entrega/precioMoneda";
const FormAddProduct = ({
  setMovimiento,
  handleChange,
  movimiento,
  values,
  errors,
  isSubmitting,
  recargar,
  setSelectedOption,
  selectedOption,
  metoPago,
}) => {
  const [conExistencia, setConExistencia] = useState(true);
  const [productosElegir, setProductosElegir] = useState([]);
  const { sabores } = useSabores();

  const productosConExistencia = sabores.filter(
    (sabor) => Number(sabor.existencia) > 0
  );

  const options = (
    productosElegir.length > 0 ? productosElegir : productosConExistencia
  ).map((sabor) => {
    const precio =
      metoPago == "CUP"
        ? sabor.precio_venta_cup + " CUP"
        : sabor.precio_venta + " " + precioMoneda(metoPago);
    return {
      value: sabor.id_sabor,
      label: sabor.nombre_sabor + " " + precio,
      nombre_sabor: sabor.nombre_sabor,
      existencia: sabor.existencia,
      precio_venta:
        metoPago == "CUP" ? sabor.precio_venta_cup : sabor.precio_venta,
      ruta_image: sabor.ruta_image,
      color: sabor.color,
    };
  });

  const handleSelectChange = (p) => {
    setSelectedOption(p);

    setMovimiento({
      ...movimiento,
      id_sabor: p.value,
      nombre_sabor: p.nombre_sabor,
      existencia: p.existencia,
      precio_venta: p.precio_venta,
      ruta_image: p.ruta_image,
      color: p.color,
    });
  };

  const handleConExistenciaChange = () => {
    setConExistencia(!conExistencia);
  };

  return (
    <>
      <div className=" flex bg-neutral-200 rounded-xl justify-center p-4">
        <div className="rounded-xl flex flex-col items-center">
          <label
            className="p-1 pb-4 mt-1  text-lg font-bold text-slate-900"
            htmlFor="sabores"
          >
            Sabores :
          </label>
          <Select
            className="w-44"
            name="nombre_sabor"
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            isSearchable
          />
        </div>
        <div className="text-slate-900 p-1 flex flex-col">
          <label
            className="p-1 flex items-center text-lg font-bold"
            htmlFor="cantidad"
          >
            Cantidad :
          </label>
          <input
            className="text-black rounded-full w-16 h-16 flex text-center font-bold text-4xl mx-2 quitarFlechas"
            name="cantidad"
            type="number"
            onChange={handleChange}
            value={values.cantidad}
            placeholder="0"
          />
          {errors.cantidad && (
            <span className="bg-red-500 fixed p-1 m-1 mx-auto rounded-xl z-0 top-52 text-xs">
              {errors.cantidad}
            </span>
          )}
        </div>
      </div>
      <div>
        {" "}
        <button
          type="submit"
          disabled={isSubmitting}
          className=" bg-heladosCarol_color w-full text-2md text-black font-bold block p-2 rounded-md"
        >
          {isSubmitting ? "Guardando..." : "Agregar"}
        </button>
      </div>
    </>
  );
};

export default FormAddProduct;
