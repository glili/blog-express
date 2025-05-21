import { Request, Response } from 'express';
import { BlogInput } from '../../dto/blog.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { db } from '../../../db/in-memory.db';
import { Blog } from '../../types/blog';
import { blogsRepository } from '../../repositories/blogs.repository';

export function createBlogHandler(
  req: Request<{}, {}, BlogInput>,
  res: Response,
) {
  const newBlog: Blog = {
    id: String(db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  blogsRepository.create(newBlog);
  res.status(HttpStatus.Created).send(newBlog);
}