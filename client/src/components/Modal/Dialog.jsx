import { useShowDialogStore } from "../../Stores/ShowDialogStore";

const Dialog = ({ dialogProps }) => {
  const { showDialog, setShowDialog } = useShowDialogStore();

  return (
    <>
      {showDialog && (
        <div className={`fixed flex justify-center items-center inset-0 z-50`}>
          <div className="flex flex-col items-center bg-white rounded-lg px-2 mx-5 text-neutral-800 font-semibold">
            <h2 className="text-neutral-800 text-4xl text-center p-2">
              {dialogProps.titulo}
            </h2>
            <p className="text-md">{dialogProps.pregunta}</p>

            <div className="flex justify-center gap-5 p-4">
              <button
                className=" text-white p-2 rounded-lg"
                onClick={() => {
                  dialogProps.handleClick();
                  setShowDialog(false);
                }}
              >
                {dialogProps.textoAceptar
                  ? dialogProps.textoAceptar
                  : "Aceptar"}
              </button>
              <button
                className="bg-neutral-200 p-1 rounded-lg"
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                {dialogProps.textoCancelar
                  ? dialogProps.textoCancelar
                  : "Cancelar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
