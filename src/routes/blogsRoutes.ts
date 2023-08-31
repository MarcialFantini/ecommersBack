import { Router } from "express";
import {
  blogGetId,
  blogsCreate,
  blogsDelete,
  blogsGetPage,
  blogsUpdate,
} from "../controllers/blogsControllers";
import { upload } from "../middleware/multer";
import { autIsAdmin, autJWT } from "../middleware/jwtValidator";

const blogsRoutes = Router();

blogsRoutes.post(
  "/create/blog",
  autJWT,
  autIsAdmin,
  upload.single("image"),
  blogsCreate
);

blogsRoutes.patch("/update/blog/:id", autJWT, autIsAdmin, blogsUpdate);

blogsRoutes.delete("/delete/blog/:id", autJWT, autIsAdmin, blogsDelete);

blogsRoutes.get("/page/:page", blogsGetPage);

blogsRoutes.get("/one/:id", blogGetId);

export { blogsRoutes };
