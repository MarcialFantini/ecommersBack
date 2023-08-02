import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";

const serviceUser = new userService();

interface bodyUserCreator {
  name: string;
  is_admin: boolean;
  password: string;
  email: string;
}

export const userCreator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hola");
  const body = req.body as bodyUserCreator;
  const data = await serviceUser.createUser();

  res.json(data);
};

export const userDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id);

  const isDeleted = await serviceUser.userDelete(id);

  if (isDeleted) {
    res.json({
      message: "deleted",
    });
  }
};
