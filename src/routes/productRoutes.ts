import { Router } from "express";
import { upload } from "../middleware/multer";
import {
  productCreate,
  productDelete,
  productForId,
  productPage,
  productUpdate,
} from "../controllers/productsControllers";

const productRoutes = Router();

productRoutes.post("/create", upload.single("image"), (req, res, next) => {
  productCreate(req, res, next);
});

productRoutes.patch(
  "/update/:id",
  async (req, res, next) => await productUpdate(req, res, next)
);

productRoutes.delete(
  "/delete/:id",
  async (req, res, next) => await productDelete(req, res, next)
);

productRoutes.get(
  "/page/:page",
  async (req, res, next) => await productPage(req, res, next)
);

productRoutes.get(
  "/one/:id",
  async (req, res, next) => await productForId(req, res, next)
);

export { productRoutes };
