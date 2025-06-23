import { Request, Response } from 'express';
import { BlogInput } from '../../dto/blog.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blog } from '../../types/blog';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';

export function createBlogHandler(
  req: Request<{}, {}, BlogInput>,
  res: Response,
) {
  const newBlog: Blog = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  blogsRepository.create(newBlog);
  res.status(HttpStatus.Created).send(newBlog);
}