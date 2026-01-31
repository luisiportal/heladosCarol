import { Imagen } from "../../models/Imagenes.model.js";
import fs from "fs/promises";

export const deleteImagenesSabores = async (imgToDelete) => {
  console.log(imgToDelete);

  // Eliminar archivos del sistema de archivos
  for (const item of imgToDelete) {
    console.log(`Deleting image: ${item.id_imagen}`);

    try {
      const imagen = await Imagen.findByPk(item.id_imagen);

      if (imagen) {
        const imagePath = `public/images/productos/${imagen.ruta_image}`;

        try {
         // await fs.promises.unlink(imagePath); viejo
          await fs.rm(imagePath, { force: true });
          console.log(`Archivo ${imagePath} eliminado correctamente.`);
        } catch (err) {
          console.error(`Error al eliminar el archivo ${imagePath}:`, err);
        }
      }
    } catch (err) {
      console.error(`Error al encontrar imagen con id ${item.id_imagen}:`, err);
    }
    // Eliminar registros de la base de datos
    try {
      const response = await Imagen.destroy({
        where: {
          id_imagen: item.id_imagen,
        },
      });

      console.log(`${response} registros eliminados de la base de datos.`);
    } catch (err) {
      console.error("Error al eliminar registros de la base de datos:", err);
    }
  }
};
