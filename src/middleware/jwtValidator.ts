import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const passwordToken = "hola123";

export const autJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado." });
  }

  await verify(token, passwordToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." });
    }
    console.log(decoded);
    req.body.user = decoded as {
      email: string;
      isAdmin: boolean;
      idUser: number;
    }; // Guarda la información del usuario decodificada en el objeto de solicitud
    next();
  });
};

export const autIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.user as {
    email: string;
    isAdmin: boolean;
    idUser: number;
  };

  console.log(token);

  if (!token.isAdmin) {
    res.json({ message: "is not a admin" });
  }

  next();
};
