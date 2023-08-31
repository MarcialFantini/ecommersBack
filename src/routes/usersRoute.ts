import { NextFunction, Request, Response, Router } from "express";
import {
  loginUser,
  userCreator,
  userDelete,
} from "../controllers/usersControllers";

const userRoute = Router();

userRoute.post("/register", userCreator);

userRoute.delete("/delete/:id", userDelete);

userRoute.post("/login", loginUser);

export { userRoute };
