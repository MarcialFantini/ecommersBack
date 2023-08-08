import { NextFunction, Request, Response } from "express";
import { blogsService, bodyBlogCreator } from "../services/blogsService";

const BlogsService = new blogsService();

export const blogsCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = {
    category: req.body.category,
    title: req.body.title,
    sub_title: req.body.sub_title,
  } as bodyBlogCreator;

  const url = req.body.file as string;

  const responseReturn = await BlogsService.createBLog(body, url);

  res.json(responseReturn);
};

export const blogsDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  const responseReturn = await BlogsService.delateBlog(id);

  res.json(responseReturn);
};

export const blogsUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as bodyBlogCreator;
  const id = Number(req.params.id);

  const responseReturn = await BlogsService.updateBlog(id, body);
  res.json(responseReturn);
};
