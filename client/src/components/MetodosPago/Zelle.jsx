import React from "react";

const Zelle = ({ total }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("heladoscarol@gmail.com");
      alert("Texto copiado al portapapeles");
    } catch (error) {
      console.error("Error al copiar el texto:", error);
    }
  };

  return (
    <div className=" pt-2 justify-center gap-2 px-6 m-1 pb-6 text-slate-600 text-justify bg-white shadow-md rounded-xl flex flex-col leading-relaxed">
      <h2 className="font-semibold text-slate-700 flex justify-center">
        Pasos para realizar Pago mediante Zelle
      </h2>
      <h4>
        1- Enviar <span className="font-bold">{total} USD</span> por{" "}
        <span className="font-bold">Zelle</span> al correo
      </h4>
      <span onClick={handleCopy} className=" cursor-pointer font-semibold text-slate-800  flex justify-center">
        heladoscarol@gmail.com
      </span>
      <h4>2- Regresar a esta pantalla marcar la casilla y presionar Enviar.</h4>
      <p>
        Una vez que recibamos la confirmación de su pago su orden será aceptada
        y procesada.
      </p>
      <h4>Gracias por elegirnos</h4>
    </div>
  );
};

export default Zelle;
