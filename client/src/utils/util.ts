import { ProductoCarrito } from "../Stores/CarritoStore";
import { Sabor } from "../types/General.types";

export const filtrar = (sabores: Sabor[], tipo) => {
  if (tipo === "Todos") return sabores;
  return sabores?.filter(
    (item) => item.categoria === tipo && item.existencia >= 1
  );
};

export const getCantidad = (
  productosCarrito: ProductoCarrito[],
  producto: Sabor
) => {
  const existe = productosCarrito?.find(
    (item) => item?.producto?.id_sabor === producto?.id_sabor
  );
  const cantidad = existe?.cantidad ?? 0;

  return cantidad;
};

export const calcTotalProducto = (
  productosCarrito: ProductoCarrito[],
  moneda: string
) => {
  const precioProducto = (producto: ProductoCarrito) => {
    if (moneda === "CUP") {
      return parseInt(String(producto?.producto?.precio_venta_cup));
    } else {
      return producto?.producto?.precio_venta;
    }
  };

  const totalProducto = productosCarrito.reduce((total, producto) => {
    return total + precioProducto(producto) * producto.cantidad;
  }, 0);

  return totalProducto.toFixed(2);
};
