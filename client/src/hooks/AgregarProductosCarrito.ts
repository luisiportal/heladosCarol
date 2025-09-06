import { ProductoCarrito } from "../Stores/CarritoStore";

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

  if (cantidad > Number(existe?.producto.existencia)) {
    return `No nos queda más ${producto.nombre_sabor}`;
  }

  if (cantidad === 0) {
    console.log(cantidad);
    
   return eliminarProductoCarrito({producto,productosCarrito,setProductosCarrito})
  }

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

export const eliminarProductoCarrito = ({
  producto,

  productosCarrito,
  setProductosCarrito,
}: {
  producto: Sabor;

  productosCarrito: ProductoCarrito[];
  setProductosCarrito: (estado: ProductoCarrito[]) => void;
}) => {
  const restantes = productosCarrito.filter(
    (item) => item.producto.id_sabor != producto.id_sabor
  );

  setProductosCarrito(restantes);
};
