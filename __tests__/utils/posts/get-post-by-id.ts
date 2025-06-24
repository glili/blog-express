// @ts-ignore
import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { PostViewModel } from '../../../src/posts/types/post-view-model';

export async function getPostById<R = PostViewModel>(
    app: Express,
    rideId: string,
    expectedStatus?: HttpStatus,
): Promise<R> {
  const testStatus = expectedStatus ?? HttpStatus.Ok;

  const getResponse = await request(app)
      .get(`${POSTS_PATH}/${rideId}`)
      .set('Authorization', generateBasicAuthToken())
      .expect(testStatus);

  return getResponse.body;
}