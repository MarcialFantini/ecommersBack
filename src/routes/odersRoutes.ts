import { Router } from "express";
import { autJWT } from "../middleware/jwtValidator";
import {
  ordersCreateController,
  ordersUpdateController,
  ordersDeleteController,
  ordersGetByIdController,
  ordersGetByPageController,
} from "../controllers/ordersControllers";

const ordersRoutes = Router();

// Ruta para crear una orden
ordersRoutes.post("/create", autJWT, ordersCreateController);

// Ruta para actualizar una orden por ID
ordersRoutes.put("/update/:id", autJWT, ordersUpdateController);

// Ruta para eliminar una orden por ID
ordersRoutes.delete("/delete/:id", autJWT, ordersDeleteController);

// Ruta para obtener una orden por ID
ordersRoutes.get("/one/:id", autJWT, ordersGetByIdController);

// Ruta para obtener una página de órdenes paginadas
ordersRoutes.get("/page/:page", autJWT, ordersGetByPageController);

export { ordersRoutes };
