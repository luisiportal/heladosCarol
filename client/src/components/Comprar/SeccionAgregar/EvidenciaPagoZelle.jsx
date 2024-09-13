import React from "react";

const EvidenciaPagoZelle = ({ ruta_image, setModalActivo, file }) => {
  const rutacompleta = ruta_image
    ? `${import.meta.env.VITE_BACKEND_URL}/images/pagos_facturas/${ruta_image}`
    : URL.createObjectURL(file);
  return (
    <img
      onClick={() => {
        setModalActivo({
          mensaje: "Pago Zelle",
          activo: true,
          imagen: rutacompleta,
        });
      }}
      className="w-12 h-12 object-cover object-center shadow-xl border-slate-50 border-spacing-2 rounded-md cursor-pointer"
      src={rutacompleta}
      alt={rutacompleta}
    />
  );
};

export default EvidenciaPagoZelle;
