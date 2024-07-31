import React from "react";
import Select from "react-select";

const SelectorProductos = ({
  handleSelectChange,
  selectedOption,
  sabores,
}) => {
  const options = sabores.map((sabor) => ({
    value: sabor.id_sabor,
    label:
      sabor.nombre_sabor +
      " Precio: " +
      sabor.precio_venta +
      " Existencia: " +
      sabor.existencia,
    existencia: sabor.existencia,
  }));
  return (
    <div className=" p-4">
      <Select
        name="nombre_sabor"
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        isSearchable
      />
    </div>
  );
};

export default SelectorProductos;
