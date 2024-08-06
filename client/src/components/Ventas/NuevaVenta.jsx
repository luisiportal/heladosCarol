import React, { useState, useEffect } from "react";



import ProductoCarrito from "./ProductoCarrito";
import Btn_Huellas from "../Btn_Huellas";
import { createVentaRequest } from "../../api/venta.api";
import Loader from "../Utilidades/Loader";
import { useAuth } from "../../context/AuthContext";
import {
  readLocalStorage,
  writeLocalStorageCrearFactura,
  writeLocalStorageCrearMovimiento,
  writeLocalStorageHacerVenta,
} from "../../hooks/useLocalStorage";


import { useParams } from "react-router-dom";


const NuevaVenta = () => {


  let fechaActual = new Date();
  let fechaEnFormatoISO = fechaActual.toISOString();

 
  const [productos, setProductos] = useState([]);


  const params = useParams();





  const pagar = async () => {
    try {
      const ventas = carrito;
      setLoader(true);
      if (!isOnline) {
        writeLocalStorageHacerVenta("ventas", {
          ventas,
          total_venta,
          creado: fechaEnFormatoISO,
        });

        writeLocalStorageCrearFactura({
          ventas,
          total_venta,
          creado: fechaEnFormatoISO,
        });
        // recorre ventas para agregar  el movimiento de cada producto
        ventas.map((venta) => {
          writeLocalStorageCrearMovimiento(
            {
              cantidad: venta.cantidad,
              producto: venta.nombre_producto,
              tipo: "Venta",
              id_producto: venta.id_producto,
              creado: fechaEnFormatoISO,
            },
            "Venta"
          );
        });
      } else {
        await createVentaRequest(carrito, total_venta, fechaEnFormatoISO);
      }

      setModalActivo({
        mensaje: `Se ha realizado la venta por un total de ${total_venta} USD`,
        activo: true,
      });

      setSelectedOption(null);
      setLoader(false);
      setProductos([]); // esto lo que permite que se actualice el estado de los productos en el selector
      setCarrito([]);

      setRecargar(!recargar);

      localStorage.removeItem("carrito" + cartSelect);
    } catch (error) {
      setLoader(false);

      setModalActivo({
        mensaje: error,
        activo: true,
        errorColor: true,
      });
    }
  };

  return (
    <div>
     
    </div>
  );
};

export default NuevaVenta;
