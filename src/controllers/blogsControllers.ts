import { NextFunction, Request, Response } from "express";
import { blogsService, bodyBlogCreator } from "../services/blogsService";
import path from "path";

const BlogsService = new blogsService();

export const blogsCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = {
      category: req.body.category,
      title: req.body.title,
      sub_title: req.body.sub_title,
    } as bodyBlogCreator;

    console.log(req.body);
    const texts = JSON.parse(req.body.texts) as string[];

    const url = path.normalize(
      [__dirname, "//..//..//", req.file?.path].join("")
    );
    const responseReturn = await BlogsService.createBLog(body, url, texts);
    res.json(responseReturn);
  } catch (error) {
    res.json(error);
  }
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

export const blogsGetPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.params.page;

  const listBlogs = await BlogsService.getPage(page);

  res.json(listBlogs);
};

export const blogGetId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idParam = req.params.id;

  const blog = await BlogsService.getBlogForId(idParam);

  res.json(blog);
};

export const blogsGetPageComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseReturn = await BlogsService.getBlogsComplete(
      Number(req.params.page)
    );

    res.json(responseReturn);
  } catch (error) {
    res.json(error);
  }
};

export const pageBlogAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.params.page);

    const blogs = await BlogsService.getAdminBlogPage(page);

    res.json(blogs);
  } catch (error) {
    console.log(error);
  }
};
