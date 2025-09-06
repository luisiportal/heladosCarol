import React from 'react'
import { Sabor } from '../../../types/General.types'
import { useMonedaStore } from '../../../Stores/MonedaStore';

const PrecioChiquito =  ({ producto }: { producto: Sabor }) => {
    const { moneda } = useMonedaStore();
    
      const precio = moneda === "CUP" ? parseInt(producto?.precio_venta_cup.toString()) : producto.precio_venta;
  return (
      <h2 className="font-bold text-lg flex ml-2">
        {precio}
        <span className="font-semibold text-neutral-500 text-xs uppercase mt-1 ml-1">
         {moneda}
        </span>
      </h2>
  )
}

export default PrecioChiquito