import { NextFunction, Request, Response } from "express";
import { ImagesProduct } from "../services/imagesProductsService";

const imagesProductService = new ImagesProduct();

export const getImageOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idProduct = Number(req.params.id);

    const imageUrl = await imagesProductService.getImageProduct(idProduct);

    res.sendFile(imageUrl);
  } catch (error) {
    res.json(error);
  }
};
