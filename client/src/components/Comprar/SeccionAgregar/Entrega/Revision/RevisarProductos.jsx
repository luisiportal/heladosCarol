import React from 'react'

const RevisarProductos = ({carrito}) => {

  return (
    <div><h2>Productos</h2>
{carrito.map((sabor =>(
    <h2>{sabor.nombre_sabor}</h2>
)))}
    
    
    
    </div>
  )
}

export default RevisarProductos