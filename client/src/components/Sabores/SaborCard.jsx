import {  useSabores } from "../../context/SaboresProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function SaborCard({ sabor }) {
  
  const [showMore, setShowMore] = useState(false);
  const [showBotones, setShowBotones] = useState(false);

  const { deleteSabor } = useSabores();
  const navigate = useNavigate();

  const handleSetmasDetalles = () => {
    setShowMore(!showMore);
  };
  const handleMouseEnter = () => {
    setShowBotones(true);
  };

  const handleMouseLeave = () => {
    setShowBotones(false);
  };

  const colorExistencia = () => {
    return sabor.existencia <= sabor.stockMinimo &&
      sabor.existencia !== "0"
      ? "border-r-8 border-yellow-400"
      : sabor.existencia === "0"
        ? "border-r-8 border-red-400 "
        : "";
  };

  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200 ${colorExistencia()}  shadow rounded overflow-hidden p-2`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSetmasDetalles}
    >
      <header className="flex">
        <div /* imagen del prodcuto */>
          <img
            className="w-12 h-12 object-cover object-center shadow-xl border-slate-50 border-spacing-2 rounded-md"
            src={"images/productos/" + sabor.ruta_image}
            alt="Imagen de Producto"
          />
        </div>
        <div className="px-3 text-left text-slate-700 font-semibold flex justify-between w-full gap-7 align-middle">
          <div className="w-3/5">
            <h2 className="text-slate-900 font-bold text-sm line-clamp-1">
              {sabor.nombre_sabor}
            </h2>
            <span className="text-xs text-white bg-red-400 rounded p-0.5">
              {sabor.color}
            </span>
          </div>

          <div className="w-2/5 text-right">
            <p>{sabor.precio_venta} USD</p>

            <p className="text-sm">
              {sabor.existencia}
            </p>
          </div>
        </div>
      </header>
      <div>
        {" "}
        {/*Boton detalles*/}
        <button
          className="bg-slate-700 py-1 px-2 rounded text-white mt-2 hover:bg-heladosCarol_color transition-colors hidden"
          onClick={handleSetmasDetalles}
        >
          {showMore ? "-" : "+"} Detalles
        </button>
        {showMore && (
          <div className="">
            <ul>
              <h3 className="text-sm italic">
                {sabor.description_producto}
              </h3>
              <p>USD: {sabor.costo_usd}</p>
              <p>MLC: {sabor.costo_mlc}</p>
              <p>ZELLE: {sabor.costo_zelle}</p>
              <p>EURO: {sabor.costo_euro}</p>
              <p>Costo: {sabor.costo_unitario} cup</p>

              <p>Costo Total: {sabor.costo_total} cup</p>

              <span>
                Creado: {new Date(sabor.createdAt).toLocaleString("es-ES")}
              </span>
            </ul>
          </div>
        )}
      </div>
      {showBotones && (
        <div className="flex gap-x-1 transition-all duration-500 ease-in-out">
          <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-heladosCarol_color">
            <button onClick={() => deleteSabor(sabor.id_sabor)}>
              Eliminar
            </button>
          </div>
          <div>
            <button
              className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-heladosCarol_color"
              onClick={() => navigate(`edit/${sabor.id_sabor}`)}
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaborCard;
