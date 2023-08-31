import { Router } from "express";
import {
  createTextController,
  deleteTextController,
  getTextAllBlogController,
  updateTextController,
} from "../controllers/blogsTextControllers";
import { autIsAdmin, autJWT } from "../middleware/jwtValidator";

const blogsTextRoutes = Router();

blogsTextRoutes.post("/create", autJWT, autIsAdmin, createTextController);

blogsTextRoutes.delete("/delete/:id", autJWT, autIsAdmin, deleteTextController);

blogsTextRoutes.patch(
  "/update/text/:id",
  autJWT,
  autIsAdmin,
  updateTextController
);

blogsTextRoutes.get("/all/:id", getTextAllBlogController);

export { blogsTextRoutes };
