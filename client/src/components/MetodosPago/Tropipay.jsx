import React from 'react'

const Tropipay = ({total}) => {
  return (
    <div className="flex flex-col  justify-center text-slate-600 gap-2">
    <h2 className="font-semibold text-slate-700 flex justify-center">
      Pasos para realizar Pago mediante TropiPay
    </h2>
    <h4>
      1- Enviar <span className="font-bold">{total.toFixed(2)} USD</span>{" "}
      por <span className="font-bold">TropiPay </span>
      <a className='flex justify-center text-slate-700 font-bold bg-fresa' href="https://tppay.me/m2wqiuub" target='_blank'> En este enlace</a>
    </h4>
   
    <p>
      Una vez que recibamos la confirmación de su pago su orden será
      aceptada y procesada.
    </p>
    <h4>Gracias por elegirnos</h4>
  </div>
  )
}

export default Tropipay