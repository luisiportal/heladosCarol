import { Link } from 'react-router-dom'
import CartSVG from '../SVG/CartSVG'

const CarritoCantidadBoton = ({cantCarrito}:{cantCarrito:number}) => {
  return (
     <button
     
        title="Carrito de Compras"
        className="relative bg-[#f9a217] rounded-full w-14 h-14 flex justify-center items-center shadow-md text-white"
      >
        <CartSVG />
        <h3 className="absolute  right-2 top-8 bg-slate-700 rounded-full p-2 w-6 h-6 flex justify-center items-center font-bold">
          {cantCarrito}
        </h3>
      </button>
  )
}

export default CarritoCantidadBoton