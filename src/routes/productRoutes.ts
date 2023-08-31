import { Router } from "express";
import { upload } from "../middleware/multer";
import {
  productCreate,
  productDelete,
  productForId,
  productPage,
  productUpdate,
} from "../controllers/productsControllers";
import { autIsAdmin, autJWT } from "../middleware/jwtValidator";

const productRoutes = Router();

productRoutes.post("/create", upload.single("image"), productCreate);

productRoutes.patch("/update/:id", autJWT, autIsAdmin, productUpdate);

productRoutes.delete("/delete/:id", autJWT, autIsAdmin, productDelete);

productRoutes.get("/page/:page", productPage);

productRoutes.get("/one/:id", productForId);

export { productRoutes };
