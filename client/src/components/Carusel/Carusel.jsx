import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Carusel = () => {
  const images = [
    {
      original: "../images/cdn-3.expansion.webp",
      thumbnail: "../images/cdn-3.expansion.webp",
    },
    {
      original: "../images/carusel/chocolateBoleadora.jpg",
      thumbnail: "../images/carusel/chocolateBoleadora.jpg",
    },
    {
      original: "../images/carusel/pote2.jpg",
      thumbnail: "../images/carusel/pote2.jpg",
    },
    {
      original: "../images/carusel/pote3.jpg",
      thumbnail: "../images/carusel/pote3.jpg",

    },
    {
      original: "../images/carusel/saboresSolo.jpg",
      thumbnail: "../images/carusel/saboresSolo.jpg",

    },
  ];
  return (
    <div className="w-full flex">
      <ImageGallery items={images}
      showPlayButton={false}
      showNav={false} />
    </div>
  );
};

export default Carusel;
