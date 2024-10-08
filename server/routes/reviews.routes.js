import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createReview,
  deleteReview,
  getReview,
  getTodosReviews,
  getTodosReviewsPublicados,
  publicarReview,
  updateReview,
} from "../controllers/Reviews.controller.js";
import { uploadPerfilReview } from "../controllers/upload.multer.js";

const reviews = Router();

reviews.get("/reviews", authRequired, getTodosReviews);
reviews.get("/reviewsP", getTodosReviewsPublicados);

reviews.post(
  "/reviews",
  uploadPerfilReview.single("ruta_image"),
  createReview
);

reviews.get("/reviews/:id_review", authRequired, getReview);

reviews.put("/reviews/:id_review", authRequired, updateReview);
reviews.put("/reviews/publicar/:id_review", authRequired, publicarReview);

reviews.delete("/reviews/:id_review", authRequired, deleteReview);

export default reviews;
