import { Express, Router } from "express";
import { userRoute } from "./usersRoute";
import { productRoutes } from "./productRoutes";
import { blogsRoutes } from "./blogsRoutes";
import { blogsTextRoutes } from "./blogsTextRoutes";
import { ordersRoutes } from "./odersRoutes";

const router_v1 = Router();

export const setUpRoutes = (app: Express) => {
  //router v1
  app.use("/api/v1", router_v1);

  router_v1.use("/login", userRoute);
  router_v1.use("/products", productRoutes);
  router_v1.use("/blogs", blogsRoutes);
  router_v1.use("/text/blogs", blogsTextRoutes);
  router_v1.use("/orders", ordersRoutes);
};
