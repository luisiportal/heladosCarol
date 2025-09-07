import Imagen from "../Imagen";
import { ProductoCarrito } from "../../../Stores/CarritoStore";
import {
  agregarProductoAlCarrito,
  eliminarProductoCarrito,
} from "../../../hooks/AgregarProductosCarrito";
import BorrarSVG from "../../SVG/BorrarSVG";
import { useMonedaStore } from "../../../Stores/MonedaStore";
import { useModal } from "../../../Stores/modalStore";

const CarritoCArdProducto = ({
  item,
  productosCarrito,
  setProductosCarrito,
}: {
  item: ProductoCarrito;
  productosCarrito: ProductoCarrito[];
  setProductosCarrito: (estado: ProductoCarrito[]) => void;
}) => {
  const { moneda } = useMonedaStore();
  const { modal } = useModal();

  const existe = productosCarrito?.find(
    (op) => op?.producto?.id_sabor === item.producto.id_sabor
  );
  const cantidad = existe?.cantidad ?? 0;
  const precio =
    moneda === "CUP"
      ? parseInt(String(existe?.producto?.precio_venta_cup))
      : existe?.producto?.precio_venta;
  const totalProducto = Number(precio) * cantidad;

  return (
    <div className="flex relative gap-5 p-2 my-5 rounded-xl bg-neutral-300 shadow-md">
      <button
        className="absolute bottom-2 left-2"
        title="Eliminar Producto"
        onClick={() =>
          eliminarProductoCarrito({
            producto: item?.producto,
            productosCarrito,
            setProductosCarrito,
          })
        }
      >
        <BorrarSVG />
      </button>
      <div className="w-28 h-28 aspect-square rounded-xl overflow-hidden">
        <Imagen
          nombre={item?.producto.nombre_sabor}
          imagen_url={item?.producto?.imagenes?.[0]?.ruta_image?? item.producto.ruta_image}
        />
      </div>
      <div className="w-40 flex-col justify-between">
        {" "}
        <h2 className="font-bold mb-4  ">{item?.producto.nombre_sabor}</h2>
        <div>
          {" "}
          <h2 className="font-bold text-lg flex mb-5 bg-neutral-200/80 p-2 rounded-xl w-fit">
            {totalProducto.toFixed(2)}
            <span className="font-semibold text-neutral-500 text-xs uppercase mt-1 ml-1">
              {moneda}
            </span>
          </h2>
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                agregarProductoAlCarrito({
                  producto: item?.producto,
                  cantidad: cantidad > 0 ? cantidad - 1 : cantidad,
                  productosCarrito,
                  setProductosCarrito,
                });
              }}
              className="bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center"
            >
              <h2 className="mb-1">-</h2>
            </button>{" "}
            <h2 className="flex justify-center font-bold text-2xl w-5">
              {cantidad}
            </h2>
            <button
              onClick={() => {
                agregarProductoAlCarrito({
                  producto: item?.producto,
                  cantidad: cantidad + 1,
                  productosCarrito,
                  setProductosCarrito,
                });
              }}
              className="bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center"
            >
              <h2 className="mb-1">+</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCArdProducto;
