import { Router } from "express";
import {
  blogGetId,
  blogsCreate,
  blogsDelete,
  blogsGetPage,
  blogsGetPageComplete,
  blogsUpdate,
  pageBlogAdmin,
} from "../controllers/blogsControllers";
import { upload } from "../middleware/multer";
import { autIsAdmin, autJWT } from "../middleware/jwtValidator";

const blogsRoutes = Router();

blogsRoutes.post(
  "/create/blog",
  upload.single("image"),

  blogsCreate
);

blogsRoutes.patch("/update/blog/:id", autJWT, autIsAdmin, blogsUpdate);

blogsRoutes.delete("/delete/blog/:id", autJWT, autIsAdmin, blogsDelete);

blogsRoutes.get("/page/:page", blogsGetPage);

blogsRoutes.get("/page/complete/:page", blogsGetPageComplete);

blogsRoutes.get("/one/:id", blogGetId);

blogsRoutes.get("/admin/page/:page", pageBlogAdmin);

export { blogsRoutes };
