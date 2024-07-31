import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
const FormAddProduct = ({
  sabores,
  setMovimiento,
  handleChange,
  movimiento,
  values,
  errors,
  isSubmitting,
  recargar,
  setSelectedOption,
  selectedOption,
}) => {
  const [conExistencia, setConExistencia] = useState(true);
  const [productosElegir, setProductosElegir] = useState([]);

  const productosConExistencia = sabores.filter(
    (sabor) => Number(sabor.existencia) > 0
  );

  useEffect(() => {
    const mostrarProductos = () => {
      if (conExistencia) {
        setProductosElegir(productosConExistencia);
      } else {
        setProductosElegir(sabores);
      }
    };
    mostrarProductos();
  }, [conExistencia, selectedOption, recargar]);

  const options = (
    productosElegir.length > 0 ? productosElegir : productosConExistencia
  ).map((sabor) => {
    return {
      value: sabor.id_sabor,
      label:
        sabor.nombre_sabor +
        " Precio: " +
        sabor.precio_venta +
        " Existencia: " +
        sabor.existencia,
      nombre_sabor: sabor.nombre_sabor,
      existencia: sabor.existencia,
      precio_venta: Number(sabor.precio_venta),
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
      <div className=" flex  bg-neutral-200 rounded-xl justify-center p-4">
        <label className="p-1 flex items-center" htmlFor="cantidad">
          Cantidad :
        </label>
        <div className="text-slate-900 p-1 flex flex-col">
          <input
            className="text-black rounded-full w-16 h-16 flex text-center font-bold text-4xl mx-2"
            name="cantidad"
            type="text"
            onChange={handleChange}
            value={values.cantidad}
            placeholder="0"
          />
          {errors.cantidad && (
            <span className="bg-red-500 fixed p-1 m-1 mx-auto rounded-xl z-0 top-40">{errors.cantidad}</span>
          )}
          
        </div>
        <div className="rounded-xl flex items-center justify-center">
          <Select
            className="mx-4"
            name="nombre_sabor"
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            isSearchable
          />
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
