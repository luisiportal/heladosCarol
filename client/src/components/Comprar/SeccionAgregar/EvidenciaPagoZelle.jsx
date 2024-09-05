import React from "react";

const EvidenciaPagoZelle = ({ ruta_image, setModalActivo }) => {
  return (
    <img
      onClick={() => {
        setModalActivo({
          mensaje: "Pago Zelle",
          activo: true,
          imagen: `${
            import.meta.env.VITE_BACKEND_URL
          }/images/pagos_facturas/${ruta_image}
         `,
        });
      }}
      className="w-12 h-12 object-cover object-center shadow-xl border-slate-50 border-spacing-2 rounded-md"
      src={`${
        import.meta.env.VITE_BACKEND_URL
      }/images/pagos_facturas/${ruta_image}`}
      alt="Imagen de Producto"
    />
  );
};

export default EvidenciaPagoZelle;
