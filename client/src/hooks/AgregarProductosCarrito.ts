import { ProductoCarrito, useCarritoStore } from "../Stores/CarritoStore";
import { Sabor } from "../types/General.types";

export const agregarProductoAlCarrito = ({
  producto,
  cantidad,
  productosCarrito,
  setProductosCarrito,
}: {
  producto: Sabor;
  cantidad: number;
  productosCarrito: ProductoCarrito[];
  setProductosCarrito: (estado: ProductoCarrito[]) => void;
}) => {
  const existe = productosCarrito?.find(
    (item) => item?.producto?.id_sabor === producto.id_sabor
  );

  if (existe) {
    return setProductosCarrito(
      productosCarrito.map((item) =>
        item.producto?.id_sabor === producto?.id_sabor
          ? { ...item, cantidad }
          : item
      )
    );
  }

  return setProductosCarrito([...productosCarrito, { producto, cantidad }]);
};
