const Zelle = ({
  total,
  setZelleok,
}: {
  total: string;
  setZelleok: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("heladoscarol@gmail.com");
      alert("Texto copiado al portapapeles");
    } catch (error) {
      console.error("Error al copiar el texto:", error);
    }
  };

  const handleChangePagoZelle = (e) => {
    console.log(e.target.checked);
    if (!e.target.checked) {
      setZelleok(false);
    } else {
      setZelleok(true);
    }
  };

  return (
    <>
      {" "}
      <div className=" pt-2 mb-5 justify-center gap-2 px-6 m-1 pb-6 text-slate-600 text-justify bg-white shadow-md rounded-xl flex flex-col leading-relaxed">
        <h2 className="font-semibold text-slate-700 flex justify-center">
          Pasos para realizar Pago mediante Zelle (USD)
        </h2>
        <h4>
          1- Enviar <span className="font-bold">{total} USD</span> por{" "}
          <span className="font-bold">Zelle</span> al correo
        </h4>
        <span
          onClick={handleCopy}
          className=" cursor-pointer font-bold text-slate-900  flex justify-center"
        >
          heladoscarol@gmail.com
        </span>
        <h4>
          2- Regresar a esta pantalla, marcar la casilla y presionar Enviar.
        </h4>
        <p>
          Una vez que recibamos la confirmación de su pago su orden será
          aceptada y procesada.
        </p>
        <h4>Gracias por elegirnos</h4>
         <div className="bg-fresa rounded-lg p-3  mt-2 text-white font-semibold ">
        <h2>
          Marque la casilla si ya realizó el pago de{" "}
          <span className="font-bold">{total} USD</span> por Zelle a
          <span className="m-1 font-semibold text-slate-800">
            heladoscarol@gmail.com
          </span>
        </h2>
        <div className="flex justify-center">
          {" "}
          <input
            title="Activar Pago Zelle"
            className="w-8 h-8 items-center"
            type="checkbox"
            name="zelleOk"
            onChange={handleChangePagoZelle}
          />
        </div>
      </div>
      </div>
     
    </>
  );
};

export default Zelle;
