import { useState } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { base64ToBlob, getCroppedImg } from "./cropUtil";

export type cropAtributo = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const CONTAINER_HEIGHT = 300;

const RecortarImagen = ({
  imagen,
  setIMGRecortar,
  files,
  setFiles,
}: {
    setIMGRecortar: React.Dispatch<React.SetStateAction<string>>
  imagen: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<cropAtributo | null>(null);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels as cropAtributo);
  };

  console.log(imagen);
  

  const handleRecortar = async () => {
    if (!croppedAreaPixels) return;

    const blob = await getCroppedImg(imagen, croppedAreaPixels);
    console.log(imagen);

    const file = new File([blob], `${imagen}.webp`, { type: "image/webp" });
    console.log(file);
    // Guardar en el estado (ahora sí es File[])


    setFiles([...files, file]);
  };

  return (
    <>
      <div className="bg-red-200 relative w-full h-80 mt-5">
        <Cropper
          image={imagen}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <section className="relative flex gap-2">
        <button type="button" onClick={handleRecortar} className="bg-red-500 rounded-xl p-2">
          Recortar
        </button>
         <button type="button" onClick={()=>setIMGRecortar("")} className="bg-neutral-700 rounded-xl p-2">
          Cancelar
        </button>
      </section>
    </>
  );
};

export default RecortarImagen;
