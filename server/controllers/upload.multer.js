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
export const uploadFactura = multer({
  dest: `public/images/pagos_facturas/`,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000, // 300 KB en bytes
  },
});

export const uploadPerfilReview = multer({
  dest: `public/images/perfilReviews/`,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000, // 300 KB en bytes
  },
});
export const uploadProducto = multer({
  dest: `public/images/productos3/`,
});

export const uploadTrabajador = multer({
  dest: `public/images/trabajadores/perfil/`,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000, // 300 KB en bytes
  },
});

export function saveImage(file, tipoFoto) {
  if (file === undefined) {
    return;
  }
  try {
    const newPath = `public/images/${tipoFoto}/${file.originalname}`;

    fs.renameSync(file.path, newPath);

    return newPath;
  } catch (error) {console.log(error);
  }
}



// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/productos');
  },
  filename: function (req, file, cb) {
    cb(null, `producto_${file.originalname}`);
  }
});

export const upload = multer({ storage: storage });


