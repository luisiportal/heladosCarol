import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Carusel = () => {
  const images = [
    {
      original: "../images/carusel/saboresSolo.jpg",
      thumbnail: "../images/carusel/saboresSolo.jpg",
    },
    {
      original: "../images/carusel/chocolateBoleadora.jpg",
      thumbnail: "../images/carusel/chocolateBoleadora.jpg",
    },
    {
      original: "../images/carusel/2.jpg",
      thumbnail: "../images/carusel/2.jpg",
    },
    {
      original: "../images/carusel/imagen1.jpg",
      thumbnail: "../images/carusel/imagen1.jpg",
    },

    {
      original: "../images/carusel/pote2.jpg",
      thumbnail: "../images/carusel/pote2.jpg",
    },
    {
      original: "../images/carusel/pote3.jpg",
      thumbnail: "../images/carusel/pote3.jpg",
    },

  ];
  return (
    <div className="w-full flex">
      <ImageGallery items={images} showPlayButton={false} showNav={false} />
    </div>
  );
};

export default Carusel;
