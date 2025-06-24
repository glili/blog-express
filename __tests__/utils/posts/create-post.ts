// @ts-ignore
import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Express } from 'express';
import { PostInput } from '../../../src/posts/dto/post.input';
import { createBlog } from '../blogs/create-blog';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { getPostDto } from './get-post-dto';
import { PostViewModel } from '../../../src/posts/types/post-view-model';

export async function createPost(
  app: Express,
  postDto?: PostInput,
): Promise<PostViewModel> {
  const blog = await createBlog(app);

  const defaultPostData = getPostDto(blog.id);

  const testPostData = { ...defaultPostData, ...postDto };

  const createdPostResponse = await request(app)
    .post(POSTS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testPostData)
    .expect(HttpStatus.Created);

  return createdPostResponse.body;
}