import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();

export const uploadPerfilReview = multer({ dest: `../server/public/images/perfilReviews/` });
export const uploadProducto = multer({ dest: `../server/public/images/productos/` });
export const uploadTrabajador = multer({ dest: `../server/public/images/trabajadores/perfil/` });



export function saveImage(file,tipoFoto) {
  if (file === undefined) {
    return;
  }
try {
  const newPath = `../server/public/images/${tipoFoto}/${file.originalname}`;

  fs.renameSync(file.path, newPath);

  return newPath;
} catch (error) {
  
}
  
}






