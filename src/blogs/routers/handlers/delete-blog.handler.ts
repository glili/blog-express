import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../../posts/repositories/posts.repository';

export function deleteBlogHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const blog = await blogsRepository.findById(id);

    if (!blog) {
      res
          .status(HttpStatus.NotFound)
          .send(
              createErrorMessages([{  message: 'Blog not found', field: 'id'}]),
          );
      return;
    }

    // If blog contains posts, can't be deleted
    const activePost = await postsRepository.findActivePostByBlogId(id);
    if (activePost) {
      res
          .status(HttpStatus.BadRequest)
          .send(
              createErrorMessages([
                { message: 'The blog is currently on a job', field: 'status' },
              ]),
          );
      return;
    }

    await blogsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}