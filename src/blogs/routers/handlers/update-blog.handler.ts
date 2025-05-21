import { Request, Response } from 'express';
import { BlogInput } from '../../dto/blog.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { blogsRepository } from '../../repositories/blogs.repository';

export function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogInput>,
  res: Response,
) {
  const id = req.params.id;
  const blog = blogsRepository.findById(id);

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Blog not found' }]),
      );
    return;
  }

  blogsRepository.update(id, req.body);
  res.sendStatus(HttpStatus.NoContent);
}