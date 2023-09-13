import { Router } from "express";
import { getImageOneBlog } from "../controllers/imagesBlogsController";

const imagesBlogsRoutes = Router();

imagesBlogsRoutes.get("/one/:id", getImageOneBlog);

export { imagesBlogsRoutes };
