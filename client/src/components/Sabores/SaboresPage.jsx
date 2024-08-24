import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";


import BTNRedondo from "../Utilidades/BTNRedondo";
import BuscadorSabores from "./BuscadorSabores";

const SaboresPage = () => {
  const { loader, setLoader, isOnline } = useAuth();

  return (
    <div>
      <BTNRedondo ruta={"/new"} />
      <h1 className="px-2 pb-2 text-3xl text-slate-700 font-bold">Sabores</h1>
      <div>
        <BuscadorSabores
          loader={loader}
          setLoader={setLoader}
          isOnline={isOnline}
        />
      </div>
    </div>
  );
};

export default SaboresPage;
