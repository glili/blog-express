import { Request, Response } from 'express';
import { BlogUpdateInput } from '../../dto/blog-update.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

export async function updateBlogHandler(
    req: Request<{ id: string }, {}, BlogUpdateInput>,
    res: Response,
) {
  try {
    const id = req.params.id;
    const blog = await blogsRepository.findById(id);

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
