import { Router } from "express";
import { getImageOne } from "../controllers/imagesProductControllers";

const imagesProductRoutes = Router();

imagesProductRoutes.get("/one/:id", getImageOne);

export { imagesProductRoutes };
