import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();

export const uploadPerfilReview = multer({ dest: `../client/public/images/perfilReviews/` });
export const uploadProducto = multer({ dest: `../client/public/images/productos/` });
export const uploadTrabajador = multer({ dest: `../client/public/images/trabajadores/perfil/` });



export function saveImage(file,tipoFoto) {
  if (file === undefined) {
    return;
  }
try {
  const newPath = `../public/images/${tipoFoto}/${file.originalname}`;

  fs.renameSync(file.path, newPath);

  return newPath;
} catch (error) {
  
}
  
}






