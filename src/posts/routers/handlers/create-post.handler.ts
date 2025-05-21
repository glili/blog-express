import { Request, Response } from 'express';
import { PostInput } from '../../dto/post.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { db } from '../../../db/in-memory.db';
import { Post } from '../../types/post';
import { postsRepository } from '../../repositories/posts.repository';
import { PostCreateInput } from '../../dto/post-create.input';
import {blogsRepository} from "../../../blogs/repositories/blogs.repository";
import {createErrorMessages} from "../../../core/utils/error.utils";

export function createPostHandler(
  req: Request<{}, {}, PostCreateInput>,
  res: Response,
) {
  const blogId = req.body.blogId;

  const blog = blogsRepository.findById(blogId);

  if (!blog) {
    res
        .status(HttpStatus.BadRequest)
        .send(
            createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
        );

    return;
  }
  const newPost: Post = {
    id: String(db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1),
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: blog.name,
  };

  postsRepository.create(newPost);
  res.status(HttpStatus.Created).send(newPost);
}