import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const resizeSharp = async (file) => {
  // Obtener la metadata de la imagen
  const metadata = await sharp(file.path).metadata();

  // Redimensionar solo si el ancho es mayor a 500 píxeles
  const outputPath = path.join(
    "./public",
    "images",
    "productos",
    `producto_${file.originalname}`
  );

  // Verificar que el directorio existe y crearlo si no
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (metadata.width > 800) {
    await sharp(file.path).resize({ width: 800 }).toFile(outputPath);

    console.log(`Imagen redimensionada guardada en: ${outputPath}`);

    // Eliminar la imagen original si no la necesitas
    fs.unlinkSync(file.path);
  } else {
    // Solo mover la imagen si no necesita ser redimensionada
    fs.renameSync(file.path, outputPath);

    console.log(`Imagen movida a: ${outputPath}`);
  }
};
