import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareButtonFB = ({ sabores }) => {
  const shareUrl = "https://heladoscarol.onrender.com/";

  return (
    <div className="flex gap-2 items-center">
      <h2 className="text-sm">Compartir en: </h2>
      <FacebookShareButton url={shareUrl} quote={sabores} hashtag={sabores}>
      <FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl} title={sabores}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtonFB;
