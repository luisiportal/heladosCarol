import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  try {
    // Aceptar solo archivos de imagen
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadPerfilReview = multer({
  dest: `public/images/perfilReviews/`,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000, // 300 KB en bytes
  },
});
export const uploadProducto = multer({
  dest: `public/images/productos/`,
  fileFilter: fileFilter,
});
export const uploadTrabajador = multer({
  dest: `public/images/trabajadores/perfil/`,
  fileFilter: fileFilter,
});

export function saveImage(file, tipoFoto) {
  if (file === undefined) {
    return;
  }
  try {
    const newPath = `public/images/${tipoFoto}/${file.originalname}`;

    fs.renameSync(file.path, newPath);

    return newPath;
  } catch (error) {}
}
