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
  try {
    const body = req.body as bodyUserCreator;
    const data = await serviceUser.createUser(body);

    res.json(data);
  } catch (error) {
    res.json(error);
  }
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body as { password: string; email: string };

    const resForReturn = await serviceUser.userLogin(password, email);

    res.json(resForReturn);
  } catch (error) {
    res.json({ errorMessage: "Error", error });
  }
};
