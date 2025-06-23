import { Request, Response } from 'express';
import { BlogInput } from '../../dto/blog.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

export function updateBlogHandler(
    req: Request<{ id: string }, {}, BlogInput>,
    res: Response,
) {
  try {
    const id = req.params.id;
    const blog = blogsRepository.findById(id);

    if (!blog) {
      res
          .status(HttpStatus.NotFound)
          .send(
              createErrorMessages([{ message: 'Blog not found', field: 'id'  }]),
          );
      return;
    }
      await blogsRepository.update(id, req.body);
      res.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
      res.sendStatus(HttpStatus.InternalServerError);
  }
}
