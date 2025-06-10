import { getSaboresReservarRequest } from "../../api/sabores.api";
import { useQuery } from "@tanstack/react-query";
import LoaderTanStack from "../Utilidades/LoaderTanStack";
import { Sabor } from "../../types/General.types";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BTN from "../HOME/Sabores/BTN";
import BorrarSVG from "../SVG/BorrarSVG";
import { useReserva } from "../../Stores/ReservarStore";
const ReservarProductos = () => {
  const navigate = useNavigate();
  const { reserva, setReserva } = useReserva();

  const [carritoReserva, setCarritoReserva] = useState<Sabor[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["saboresreservar"],
    queryFn: () => getSaboresReservarRequest(),
  });
  if (isLoading) return <LoaderTanStack />;

  const sabores = data ?? ([] as Sabor[]);

  const handleChangeCantidad = (id: number, e: any) => {
    setCarritoReserva((prevState) =>
      prevState.map((item) =>
        Number(item.id_sabor) === id
          ? { ...item, cantidad: e.target.value } // Initializes `sabor`
          : item
      )
    );
  };

  const onChangeChecked = (sabor: Sabor, e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCarritoReserva([...carritoReserva, { ...sabor, cantidad: 1 }]);
    } else {
      quitar(sabor);
    }
  };

  const onclickContinuar = () => {
    if (reserva.fecha.length > 1 && carritoReserva.length > 0) {
      setReserva({
        productos: carritoReserva,
        fecha: reserva.fecha,
      });
      navigate("/reservar/metodo");
    }
  };

  const onClickProducto = (sabor: Sabor) => {
    const existe = carritoReserva.some(
      (item) => Number(item.id_sabor) === Number(sabor.id_sabor)
    );

    !existe &&
      setCarritoReserva([...carritoReserva, { ...sabor, cantidad: 1 }]);
  };
  const incrementar = (sabor: Sabor) => {
    setCarritoReserva((prevState) =>
      prevState.map((item) =>
        Number(item.id_sabor) === Number(sabor.id_sabor)
          ? { ...item, cantidad: Number(item.cantidad) + 1 } // Initializes `sabor`
          : item
      )
    );
  };
  const decrementar = (sabor: Sabor) => {
    setCarritoReserva((prevState) =>
      prevState.map((item) =>
        Number(item.id_sabor) === Number(sabor.id_sabor)
          ? {
              ...item,
              cantidad:
                Number(item.cantidad) > 1
                  ? Number(item.cantidad) - 1
                  : item.cantidad,
            } // Initializes `sabor`
          : item
      )
    );
  };

  const quitar = (sabor: Sabor) => {
    const restantes = carritoReserva.filter(
      (item) => Number(item.id_sabor) != Number(sabor.id_sabor)
    );
    setCarritoReserva(restantes);
  };

  return (
    <section className="bg-[#aeccfe] pt-20 h-full pb-32">
      {sabores.map((sabor, index) => (
        <section
          onClick={() => onClickProducto(sabor)}
          className="flex gap-2 mb-2 cursor-pointer"
        >
          {sabor.imagenes && sabor.imagenes.length > 0 && (
            <section>
              <div
                className={`ml-5 flex flex-col items-center justify-center bg-white shadow-md w-36 h-48 rotate-${
                  index + 1
                }`}
              >
                {" "}
                <img
                  className="w-32 h-32 object-center object-cover pt-2 bg-[#aeccfe]"
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${
                    sabor.imagenes[0].ruta_image
                  }`}
                  alt={sabor.nombre_sabor}
                />
                <div className="flex gap-2 items-center justify-center">
                  <input
                    title="Seleccionar"
                    name="seleccionar"
                    type="checkbox"
                    checked={carritoReserva.some(
                      (item) => item.id_sabor === sabor.id_sabor
                    )}
                    onChange={(e) => onChangeChecked(sabor, e)}
                  />
                  <img
                    className="w-12"
                    src="images/moustache.svg"
                    alt="Moustache"
                  />
                  <input
                    title="Cantidad"
                    type="text"
                    name="cantidad"
                    value={
                      carritoReserva.find(
                        (item) => item.id_sabor === sabor.id_sabor
                      )?.cantidad ?? 0
                    }
                    onChange={(e) => handleChangeCantidad(sabor.id_sabor, e)}
                    className="w-5 h-5 font-bold text-[#1654be]"
                  />
                </div>
              </div>
            </section>
          )}
          <div className="flex flex-col items-center w-52 text-center font-bold">
            <h2 className="font-bold text-white bg-[#1654be] rounded-xl text-center w-28 p-0.5 font-sans">
              {sabor.nombre_sabor}
            </h2>
            <p className="text-center font-bold">{sabor.description}</p>
            <h2>Precio: </h2>
            <h2>
              {sabor.precio_venta} USD | {sabor.precio_venta_cup} CUP{" "}
            </h2>
            <h2></h2>
          </div>
        </section>
      ))}
      <section className="flex flex-col items-center justify-center bg-blue-200 p-5">
        <h2 className="font-bold  rounded-xl text-center w-60  p-5 pt-0">
          Productos Seleccionados
        </h2>
        {carritoReserva.length ==0 && <h2 className="font-light text-sm  rounded-xl text-center w-60  p-5 pt-0">
          Todavía no ha seleccionado nada
        </h2>}
        <section className="flex flex-col justify-center">
          {" "}
          {carritoReserva.map((item) => (
            <div className="flex items-center justify-end gap-5 w-full">
              {" "}
              <section className="bg-white p-2 rounded-lg font-semibold my-2">
                {item.cantidad} x {item.nombre_sabor}
              </section>
              <button
                title="Incrementar"
                className="bg-white hover:bg-[#1654be] transition-colors duration-700 w-10 h-10 p-2 rounded-full aspect-square font-black text-2xl flex items-center justify-center"
                onClick={() => incrementar(item)}
              >
                +
              </button>
              <button
                title="Quitar"
                className="bg-white hover:bg-red-500 transition-colors duration-700 w-10 h-10 p-2 rounded-full aspect-square font-black text-2xl flex items-center justify-center"
                onClick={() => decrementar(item)}
              >
                -
              </button>
              <button
                title="Borrar"
                className="bg-red-500 w-10 h-10 p-2 rounded-full aspect-square"
                onClick={() => quitar(item)}
              >
                <BorrarSVG />
              </button>
            </div>
          ))}
        </section>
      </section>
      <div className="flex flex-col items-center justify-center p-2">
        <h2 className="font-bold  rounded-xl text-center p-5">
          Seleccione el día de la entrega
        </h2>
        <select
          className="p-2 rounded-lg"
          title="Fecha entrega"
          name="selec-dia"
          onChange={(e) =>
            setReserva({
              productos: carritoReserva,
              fecha: String(e.target.value),
            })
          }
        >
          <option value="">Seleccionar</option>

          <option value="domingo">Domingo, 15 junio</option>
          <option value="sabado">Sábado, 14 junio</option>
        </select>
      </div>

      <button
        title="Continuar"
        onClick={onclickContinuar}
        className="w-full flex flex-col items-center justify-center p-5"
      >
        <BTN color={"#f9a217"} texto="Continuar" />
      </button>
    </section>
  );
};

export default ReservarProductos;
