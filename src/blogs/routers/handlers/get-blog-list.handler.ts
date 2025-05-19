import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';

export function getBlogListHandler(req: Request, res: Response) {
  const blogs = blogsRepository.findAll();
  res.send(blogs);
}