import request from 'supertest';
import { Express } from 'express';
import { BlogInput } from '../../../src/blogs/dto/blog.input';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { getBlogDto } from './get-blog-dto';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';

export async function updateBlog(
  app: Express,
  blogId: number,
  blogDto?: BlogInput,
): Promise<void> {
  const defaultBlogData: BlogInput = getBlogDto();

  const testBlogData = { ...defaultBlogData, ...blogDto };

  const updatedBlogResponse = await request(app)
    .put(`${BLOGS_PATH}/${blogId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testBlogData)
    .expect(HttpStatus.NoContent);

  return updatedBlogResponse.body;
}