import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { clearDb } from '../../utils/clear-db';
import { createPost } from '../../utils/posts/create-post';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { getPostById } from '../../utils/posts/get-post-by-id';

describe('Posts API', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeAll(async () => {
    await clearDb(app);
  });

  it('✅ should create post; POST /posts', async () => {
    await createPost(app);
  });

  it('✅ should return posts list; GET /posts', async () => {
    await createPost(app);

    const postListResponse = await request(app)
      .get(POSTS_PATH)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);

    expect(postListResponse.body).toBeInstanceOf(Array);
    expect(postListResponse.body).toHaveLength(2);
  });

  it('✅ should return post by id; GET /posts/:id', async () => {
    const createdPost = await createPost(app);

    const getPost = await getPostById(app, createdPost.id);

    expect(getPost).toEqual({
      ...createdPost,
      id: expect.any(Number),
      createdAt: expect.any(String),
    });
  });
});

