import { NextFunction, Request, Response } from "express";
import {
  ServiceTextBlog,
  blogTextCreatorInterface,
} from "../services/textBlogService";

const serviceText = new ServiceTextBlog();

export const createTextController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as blogTextCreatorInterface;

  const responseCreate = await serviceText.createBlogText(body);

  res.json(responseCreate);
};

export const deleteTextController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const responseDelete = await serviceText.deleteBlogText(Number(id));

  res.json(responseDelete);
};

export const updateTextController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as blogTextCreatorInterface;
  const id = Number(req.params.id);

  const responseToUpdated = await serviceText.updateBlogText(body, id);

  res.json(responseToUpdated);
};

export const getTextAllBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  const responseGet = await serviceText.getBlogTexts(id);

  res.json(responseGet);
};
