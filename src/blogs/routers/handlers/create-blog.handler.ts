import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blog } from '../../types/blog';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import {BlogCreateInput} from "../../dto/blog-create.input";

export async function createBlogHandler(
  req: Request<{}, {}, BlogCreateInput>,
  res: Response,
) {
  try {
    const newBlog: Blog = {
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      createdAt: new Date(),
      isMembership: true
    };

    const createdBlog = await blogsRepository.create(newBlog);
    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}