import React from "react";
import BTN_MePago from "../../MetodosPago/BTN_MePago";

const IconoPasarela = ({ pasarela }) => {
  return (
    <div>
      {pasarela == "TropiPay" ? (
        <img
          className="w-16 h-8 rounded-xl object-cover object-center "
          src={`../images/tropipay.jpg`}
          alt={name}
        />
      ) : (
        <img
          className="w-16 h-8 rounded-xl object-cover object-center"
          src={`../images/zelle.png`}
          alt={name}
        />
      )}
    </div>
  );
};

export default IconoPasarela;
