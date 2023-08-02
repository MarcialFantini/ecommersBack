import { NextFunction, Request, Response, Router } from "express";
import { userCreator, userDelete } from "../controllers/usersControllers";

const userRoute = Router();

userRoute.post("/register", (req, res, next) => userCreator(req, res, next));

userRoute.delete("/delete/:id", (req, res, next) => userDelete(req, res, next));

export { userRoute };
