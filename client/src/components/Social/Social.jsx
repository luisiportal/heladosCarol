import React from "react";
import SocialBTN from "./SocialBTN";

const Social = ({ sabores }) => {
  return (
    <div className="flex gap-2 items-center">
      <h2 className="text-sm">Síguenos :</h2>
      <SocialBTN
        redSocial={"Facebook"}
        image={"../images/fb.png"}
        link={
          "https://www.facebook.com/heladoscarolhlg"
        }
      />
      <SocialBTN
        redSocial={"WhatsApp"}
        image={"../images/whatsapp.png"}
        link={`https://api.whatsapp.com/send?text=Exelente Calidad disponibles ${sabores} https%3A%2F%2Fwww.heladoscarol.com%2F`}
      />
      <SocialBTN
        redSocial={"Instagram"}
        image={"../images/instagram.png"}
        link={`https://www.instagram.com/heladoscarol`}
      />
    </div>
  );
};

export default Social;
