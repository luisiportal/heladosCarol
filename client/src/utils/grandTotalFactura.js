export const grandTotalFactura = (totalVenta,envio)=>{
    let total = Number(totalVenta) + Number(envio);
    return total = Math.round(total * 10) / 10;
} 