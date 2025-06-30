
import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { clearDb } from '../../utils/clear-db';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import {runDB} from "../../../src/db/mongo.db";

describe('Posts API body validation check', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeAll(async () => {
      await runDB(
          'mongodb+srv://admin:admin@lesson.oxuydeq.mongodb.net/?retryWrites=true&w=majority&appName=lesson',
      );
    await clearDb(app);
  });

  it(`❌ should not create post when incorrect body passed; POST /posts'`, async () => {
    await request(app)
      .post('/posts')
      .send({})
      .expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        title: '   ', // empty string
        shortDescription: '   ',
        content: '   ',
        driverId: 'bam', //not a number
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(6);

    const invalidDataSet2 = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        title: 'LA', // short string
        shortDescription: 'gg',
        content: 'by',
        driverId: 0, //can not be 0
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(5);

    const invalidDataSet3 = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        blogId: 5000, //driver should exist
        title: 'Sam',
        shortDescription: 'testing',
        content: 'nsnzsmcjowk,cxz.cvm,dgjkmox,  ojgkfdbvm',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    // check что никто не создался
    const postListResponse = await request(app)
      .get(POSTS_PATH)
      .set('Authorization', adminToken);

    expect(postListResponse.body).toHaveLength(0);
  });
});
