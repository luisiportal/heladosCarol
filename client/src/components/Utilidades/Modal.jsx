
const Modal = ({ errorColor, mensaje, imagen }) => {
  
  
  document.body.style.overflow = "hidden";
  return (
    <div
      className={`${
        errorColor ? "bg-red-500" : "bg-green-500"
      } py-4 rounded px-2 text-white font-semibold transition-all z-0 flex  flex-col items-center justify-center`}
    >
      <h2>{mensaje}</h2>
      {imagen && (
        <img
          className="object-cover object-center shadow-xl border-slate-50 border-spacing-2 rounded-md  w-5/6 h-3/4"
          src={`${imagen}`}
          alt={mensaje}
        />
      )}
    </div>
  );
};

export default Modal;
