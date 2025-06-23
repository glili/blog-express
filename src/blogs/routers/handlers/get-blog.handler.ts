import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { blogsRepository } from '../../repositories/blogs.repository';
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";

export function getBlogHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const blog = await blogsRepository.findById(id);

    if (!blog) {
      res
          .status(HttpStatus.NotFound)
          .send(
              createErrorMessages([{ message: 'Blog not found', field: 'id' }]),
          );

      return;
    }

    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}