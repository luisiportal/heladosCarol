import React from 'react'

const Zelle = ({total}) => {
  return (
    <div className="flex flex-col  justify-center text-slate-600 gap-2">
    <h2 className="font-semibold text-slate-700 flex justify-center">
      Pasos para realizar Pago mediante Zelle
    </h2>
    <h4>
      1- Enviar <span className="font-bold">{total.toFixed(2)} USD</span>{" "}
      por <span className="font-bold">Zelle</span> al correo
    </h4>
    <span className="font-semibold text-slate-800  flex justify-center">
      heladoscarol@gmail.com
    </span>

    <p>
      Una vez que recibamos la confirmación de su pago su orden será
      aceptada y procesada.
    </p>
    <h4>Gracias por elegirnos</h4>
  </div>
  )
}

export default Zelle