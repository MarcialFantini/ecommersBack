import { NextFunction, Request, Response } from "express";
import { pool } from "../libs/pg";
import fs from "fs";

export const getImageOneBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idProduct = Number(req.params.id);

    const imageUrl = await pool.query(
      "SELECT url_image from blogs WHERE id = $1",
      [idProduct]
    );

    if (!imageUrl.rowCount) {
      throw new Error("Imagen no encontrada");
    }

    res.sendFile(imageUrl.rows[0].url_image);
  } catch (error) {
    res.json(error);
  }
};
