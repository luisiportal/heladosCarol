export const totalVentaYenvio = (productos, entrega) => {
    const total_venta = productos.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  
    let grandTotalCobrar = Number(total_venta) + Number(entrega.envio);
    grandTotalCobrar = Math.round(grandTotalCobrar * 10) / 10;
  
    console.log(entrega.envio);
    
    return grandTotalCobrar;
  };
  