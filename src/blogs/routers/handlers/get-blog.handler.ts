import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { blogsRepository } from '../../repositories/blogs.repository';

export function getBlogHandler(req: Request, res: Response) {
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

  res.send(blog);
}