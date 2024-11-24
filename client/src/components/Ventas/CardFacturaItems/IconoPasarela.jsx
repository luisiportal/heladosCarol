import React from "react";
import BTN_MePago from "../../MetodosPago/BTN_MePago";

const IconoPasarela = ({ pasarela }) => {
  return (
    <div>
      {pasarela == "CUP" && (
        <img
          className="w-16 h-8 rounded-xl object-cover object-center"
          src={`../images/billete500cup.jpg`}
          alt={pasarela}
        />
      )}

      {pasarela == "Zelle" && (
        <img
          className="w-16 h-8 rounded-xl object-cover object-center"
          src={`../images/zelle.png`}
          alt={pasarela}
        />
      )}
      {pasarela == "TropiPay" && (
        <img
          className="w-16 h-8 rounded-xl object-cover object-center "
          src={`../images/tropipay.jpg`}
          alt={pasarela}
        />
      )}
    </div>
  );
};

export default IconoPasarela;
