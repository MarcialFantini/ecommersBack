import { Express, Router } from "express";
import { userRoute } from "./usersRoute";

const router_v1 = Router();

export const setUpRoutes = (app: Express) => {
  //router v1
  app.use("/api/v1", router_v1);

  router_v1.use("/login", userRoute);
};
