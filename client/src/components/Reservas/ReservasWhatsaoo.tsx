import TituloModulo from "../V2/DesingSystem/TituloModulo";
import ImagenCustom from "./ImagenCustom";

const ReservasWhatsaoo = () => {

  const sendWhatsAppMessage = () => {
    const phoneNumber = "5355079490"; // número en formato internacional
    const message = "Hola, quiero hacer una reserva";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

    
  return (
    <>
      {" "}
      <TituloModulo titulo="Reserva tu Día Especial" />
      <section className="rounded-xl p-0.5 relative ">
        <img
          className="rounded-xl absolute -z-10 w-full h-full object-cover border-neutral-300 border-2"
          src="/images/bg-reservas-modulo.webp"
          alt="Reservar"
        />

       <div className="my-4 flex justify-center"> <img src="/images/textoReservas.svg" alt="Reservar" /></div>

        <div className="flex gap-2 justify-center my-2">
          <ImagenCustom imagen="cake.webp" />
          <ImagenCustom imagen="tina.webp" />
          <ImagenCustom imagen="buffet.webp" />
          <ImagenCustom imagen="todosCat.webp" />
        </div>
        <div className="flex justify-end m-1 my-4">
          {" "}
          <button onClick={()=>sendWhatsAppMessage()} className="bg-fresa rounded-xl text-white flex gap-1 justify-center items-center p-1 font-bold w-28 border-neutral-50 border">
            <img
              className="w-5 rounded-xl"
              src="images/whatsapp.png"
              alt="Logo Whatsapp"
            />
            Reservar
          </button>
        </div>
      </section>
    </>
  );
};

export default ReservasWhatsaoo;
