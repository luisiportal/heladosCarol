import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Carusel = () => {
  const images = [
    {
      original: "../images/carusel/1.jpg",
      thumbnail: "../images/carusel/1.jpg",

      originalHeight: "400px",
    },
    {
      original: "../images/carusel/2.jpg",
      thumbnail: "../images/carusel/2.jpg",
    },
    {
      original: "../images/carusel/3.jpg",
      thumbnail: "../images/carusel/3.jpg",
    },
    {
      original: "../images/carusel/4.jpg",
      thumbnail: "../images/carusel/4.jpg",
    },
    {
      original: "../images/carusel/5.jpg",
      thumbnail: "../images/carusel/5.jpg",
    },
    {
      original: "../images/carusel/6.jpg",
      thumbnail: "../images/carusel/6.jpg",
    },
    {
      original: "../images/carusel/7.jpg",
      thumbnail: "../images/carusel/7.jpg",
    },
    {
      original: "../images/carusel/8.jpg",
      thumbnail: "../images/carusel/8.jpg",
    },
  ];
  return (
    <div className="w-full flex">
      <ImageGallery items={images} showPlayButton={false} showNav={false} />
    </div>
  );
};

export default Carusel;
