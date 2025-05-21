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
  const lastId = db.blogs.length > 0 ? Number(db.blogs[db.blogs.length - 1].id) : 0;

  const newBlog: Blog = {
    id: String(lastId + 1), // ✅ ensure id is string
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  blogsRepository.create(newBlog);
  res.status(HttpStatus.Created).send(newBlog); // ✅ correct response
}
