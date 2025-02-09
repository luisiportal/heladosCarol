import { Imagen } from "../../models/Imagenes.model.js";
import fs from "fs";
import path from "path";

export const deleteImagenesSabores = async (imgToDelete) => {
  if (!imgToDelete) {
    return 0;
  }
  try {
    // Eliminar archivos del sistema de archivos
    for (const item of imgToDelete) {
      const imagen = await Imagen.findByPk(imgToDelete);

      if (imagen) {
        const imagePath = `public/images/productos/${imagen.ruta_image}`;

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Error al eliminar el archivo ${imagePath}:`, err);
          } else {
            console.log(`Archivo ${imagePath} eliminado correctamente.`);
          }
        });
      }
    }
    // Eliminar registros de la base de datos
    const response = await Imagen.destroy({
      where: {
        id_imagen: imgToDelete,
      },
    });

    console.log(`${response} imágenes eliminadas de la base de datos.`);
  } catch (error) {
    console.log("Error al eliminar imágenes:", error);
  }
};
