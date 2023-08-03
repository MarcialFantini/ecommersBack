import { Express, Router } from "express";
import { userRoute } from "./usersRoute";
import { productRoutes } from "./productRoutes";

const router_v1 = Router();

export const setUpRoutes = (app: Express) => {
  //router v1
  app.use("/api/v1", router_v1);

  router_v1.use("/login", userRoute);
  router_v1.use("/products", productRoutes);
};
