import { ProductoCarrito } from "../../../Stores/CarritoStore";
import { useMonedaStore } from "../../../Stores/MonedaStore";

const PRoductosRevisarSection = ({
  productosCarrito,
  envio,
  granTotalFactura,
}: {
  productosCarrito: ProductoCarrito[];
  envio: number;
  granTotalFactura: string;
}) => {
  const { moneda } = useMonedaStore();

  const totalUnProducto = (item: ProductoCarrito) => {
    const precio =
      moneda === "CUP"
        ? parseInt(String(item?.producto?.precio_venta_cup))
        : item?.producto?.precio_venta;

    return precio * Number(item?.cantidad);
  };

  return (
    <div className="bg-fresa flex gap-2 p-2 rounded-xl text-xs ">
      <div className="bg-neutral-100 rounded-xl p-2 w-full ">
        {productosCarrito.map((item) => (
          <div
            key={item.producto.id_sabor}
            className="flex justify-between items-center"
          >
            <h2>
              {item.cantidad} x {item.producto.nombre_sabor}{" "}
            </h2>{" "}
            <h2 className="flex justify-end w-28">
              {totalUnProducto(item)} {moneda}
            </h2>
          </div>
        ))}
        <div className="flex justify-end text-xs"><h2>Envio : {envio} {moneda}</h2></div>
      </div>
      <div className="bg-neutral-100 w-32 rounded-xl p-2 flex flex-col  justify-center items-center">
        <h2>Total:</h2>
        <h2>
          {granTotalFactura} {moneda}
        </h2>
      </div>
    </div>
  );
};

export default PRoductosRevisarSection;
