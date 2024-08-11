import React from "react";
import RevisarProductos from "./Revision/RevisarProductos";
import DireccionEntrega from "./Revision/DireccionEntrega";

const RevisarPedido = ({ carrito, entrega }) => {
 
  return (
    <div className="pt-12">
      <h1>Revisar Pedido</h1>
      <RevisarProductos carrito={carrito}/>
<DireccionEntrega entrega={entrega}/>



    </div>
  );
};

export default RevisarPedido;
