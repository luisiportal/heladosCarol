import { saveImage } from "../controllers/upload.multer.js";

import sequelize from "../db.js";
import { Review } from "../models/Review.model.js";

// listar todas los productos
export const getTodosReviewsPublicados = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const response = await Review.findAll({
      where: {
        publicado: true,
      },
      order: [["id_review", "DESC"]],
      limit: limit,
      offset: offset,
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodosReviews = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const response = await Review.findAll({
      order: [["id_review", "DESC"]],
      limit: limit,
      offset: offset,
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// listar un review
export const getReview = async (req, res) => {
  try {
    const id_review = req.params.id_review;

    const response = await Review.findByPk(id_review);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear una review
export const createReview = async (req, res) => {
  let ruta_image = "defaultPerfil.jpg";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }

  try {
    const { autor, comentario } = req.body;

    function validarAlfanumerico(cadena) {
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ,. .-]*$/;
      return regex.test(cadena);
    }
    if (!validarAlfanumerico(autor) || !validarAlfanumerico(comentario)) {
      return res.json({ error: "Cadena inválida. Asegúrate de que solo contiene caracteres alfanuméricos." });
    }

    try {
      const response = await Review.create({
        autor,
        comentario,
        ruta_image,
      });

      saveImage(req.file, "perfilReviews");

      res.json({
        id_review: response.insertId,
        autor,
        comentario,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// actualizar

export const updateReview = async (req, res) => {
  try {
    const { publicado } = req.body;

    const response = await Review.findByPk(id_producto);

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const publicarReview = async (req, res) => {
  try {
    const response = await Review.findByPk(req.params.id_review);
    response.publicado = true;
    await response.save();

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// borrar

export const deleteReview = async (req, res) => {
  try {
    const reviewTraidoDB = await Review.findByPk(req.params.id_review);

    const response = await Review.destroy({
      where: {
        id_review: req.params.id_review,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
