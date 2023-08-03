import { NextFunction, Request, Response } from "express";
import { bodyCreate, productService } from "../services/productsService";

const serviceProduct = new productService();
export const productCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as bodyCreate;

  if (req.file?.path) {
    serviceProduct.create(req.file.path, body);
    res.json("todo ok");
  }
};

export const productUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as bodyCreate;
  const id = Number(req.params.id);

  await serviceProduct.updateProduct(id, body);
  res.json("todo ok");
};

export const productDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const responseReturn = await serviceProduct.deleteProduct(Number(id));

  res.json(responseReturn);
};

export const productPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.params.page);

  const responseReturn = await serviceProduct.getPage(page);

  res.json(responseReturn);
};

export const productForId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const product = await serviceProduct.getProductForId(id);

  res.json(product[0]);
};
