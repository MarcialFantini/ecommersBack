import { Router } from "express";
import {
  createTextController,
  deleteTextController,
  getTextAllBlogController,
  updateTextController,
} from "../controllers/blogsTextControllers";

const blogsTextRoutes = Router();

blogsTextRoutes.post("/create", async (req, res, next) =>
  createTextController(req, res, next)
);

blogsTextRoutes.delete("/delete/:id", async (req, res, next) =>
  deleteTextController(req, res, next)
);

blogsTextRoutes.patch(
  "/update/text/:id",
  async (req, res, next) => await updateTextController(req, res, next)
);

blogsTextRoutes.get(
  "/all/:id",
  async (req, res, next) => await getTextAllBlogController(req, res, next)
);

export { blogsTextRoutes };
