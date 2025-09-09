
const Imagen = ({imagen_url,nombre}:{nombre:string,imagen_url:string}) => {
  return (
    <img
      className="object-cover w-full h-full"
      src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${imagen_url}`}
      alt={nombre}
    />
  );
};

export default Imagen;
