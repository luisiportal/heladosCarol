import { useCarritoStore } from "../../../Stores/CarritoStore";
import CarritoCArdProducto from "./CarritoCArdProducto";
import TituloModulo from "../DesingSystem/TituloModulo";
import { useMonedaStore } from "../../../Stores/MonedaStore";
import Btn_Huellas from "../../Btn_Huellas";
import { writeLocalStorage } from "../../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { calcTotalProducto } from "../../../utils/util";
import ArrowRight from "../../SVG/ArrowRight";
import Horario from "../../Horario/Horario";
import SelecMoneda from "../../SelecMoneda";

const CarritoPage = () => {
  const { setProductosCarrito, productosCarrito } = useCarritoStore();
  const { moneda } = useMonedaStore();

  const totalProducto = calcTotalProducto(productosCarrito, moneda);

  return (
    <>
      {" "}
      <div className="pt-20 pb-2 flex justify-between p-2">
        <Horario />

        <SelecMoneda />
      </div>
      <div className="-mt-14 p-5 h-full pb-32">
        <TituloModulo titulo="Carrito de Compras" />
 {productosCarrito.length > 0 && (
          <Link to={"/entrega"}>
            {" "}
            <div className="flex gap-2 justify-end items-center ">
              <button className="bg-fresa rounded-xl text-black font-bold w-28 h-10  p-2 flex gap-2 items-center">
                Entrega <ArrowRight />
              </button>
            </div>
          </Link>
        )}
        {productosCarrito?.map((item) => (
          <CarritoCArdProducto
            item={item}
            productosCarrito={productosCarrito}
            setProductosCarrito={setProductosCarrito}
            key={item?.producto?.id_sabor}
          />
        ))}

        <h2 className="flex justify-between font-semibold mb-2 text-sm">
          Sub Total Productos:{" "}
          <span className="font-bold">
            {" "}
            {totalProducto} {moneda}
          </span>
        </h2>
        {productosCarrito.length > 0 && (
          <Link to={"/entrega"}>
            {" "}
            <div className="flex gap-2 justify-end items-center ">
              <button className="bg-fresa rounded-xl text-black font-bold w-28 h-10  p-2 flex gap-2 items-center">
                Entrega <ArrowRight />
              </button>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default CarritoPage;
