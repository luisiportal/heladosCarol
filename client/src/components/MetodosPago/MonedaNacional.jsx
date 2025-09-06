
const MonedaNacional = ({ total }) => {
  return (
    <div className=" gap-2  m-1 p-5 mb-4 text-slate-600 text-justify bg-white shadow-md rounded-xl flex flex-col leading-relaxed">
      <h2 className="font-semibold text-slate-700 flex justify-center">
        Pasos para realizar Pago
      </h2>
      <h2 className="font-semibold text-slate-700 flex justify-center">
        {" "}
        Efectivo Moneda Nacional (CUP)
      </h2>
      <h4>
        1-Tener listo <span className="font-bold">{total} CUP en efectivo</span>{" "}
        <span className="font-bold">al momento de la entrega </span> para
        agilizar el proceso.
      </h4>
      <span className="font-semibold text-slate-800  flex justify-center">
        heladoscarol@gmail.com
      </span>

      <h4>Gracias por elegirnos</h4>
    </div>
  );
};

export default MonedaNacional;
