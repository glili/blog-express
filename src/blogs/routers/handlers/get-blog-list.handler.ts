import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { HttpStatus } from '../../../core/types/http-statuses';

export function getBlogListHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    const blogViewModels = blogs.map(mapToBlogViewModel);
    res.send(blogViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}