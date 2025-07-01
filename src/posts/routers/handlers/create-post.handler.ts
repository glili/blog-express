import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Post } from '../../types/post';
import { postsRepository } from '../../repositories/posts.repository';
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { mapToPostViewModelUtil } from '../mappers/map-to-post-view-model.util';
import { PostCreateInput } from "../../dto/post-create.input";

export async function createPostHandler(
  req: Request<{}, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const blogId = req.body.blogId;

    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      res
          .status(HttpStatus.BadRequest)
          .send(
              createErrorMessages([{message: 'Blog not found', field: 'id'}]),
          );

      return;
    }
    const newPost: Post = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: blog.name,
      createdAt: new Date(),
    };

    const createdPost = await postsRepository.createPost(newPost);
    const postViewModel = mapToPostViewModelUtil(createdPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (e:unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}