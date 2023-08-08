import { Router } from "express";
import {
  blogsCreate,
  blogsDelete,
  blogsUpdate,
} from "../controllers/blogsControllers";

const blogsRoutes = Router();

blogsRoutes.post(
  "/create/blog",
  async (req, res, next) => await blogsCreate(req, res, next)
);

blogsRoutes.patch(
  "/update/blog/:id",
  async (req, res, next) => await blogsUpdate(req, res, next)
);

blogsRoutes.delete(
  "/delete/blog/:id",
  async (req, res, next) => await blogsDelete(req, res, next)
);

export { blogsCreate };
