import React from 'react'
import Bton_eliminar_producto from '../Bton_eliminar_producto'

const ElimiarFacturaBTN = ({id,handleEliminar}) => {
  return (
    <button
    className="flex"
    onClick={() => handleEliminar(id)}
  >
    <Bton_eliminar_producto /> Eliminar Factura
  </button>
  )
}

export default ElimiarFacturaBTN