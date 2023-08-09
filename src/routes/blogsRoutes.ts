import { Router } from "express";
import {
  blogGetId,
  blogsCreate,
  blogsDelete,
  blogsGetPage,
  blogsUpdate,
} from "../controllers/blogsControllers";
import { upload } from "../middleware/multer";

const blogsRoutes = Router();

blogsRoutes.post(
  "/create/blog",
  upload.single("image"),
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

blogsRoutes.get("/page/:page", async (req, res, next) =>
  blogsGetPage(req, res, next)
);

blogsRoutes.get("/one/:id", async (req, res, next) =>
  blogGetId(req, res, next)
);

export { blogsRoutes };
