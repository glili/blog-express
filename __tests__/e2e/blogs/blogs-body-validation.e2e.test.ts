// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BlogInput } from '../../../src/blogs/dto/blog.input';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { getBlogDto } from '../../utils/blogs/get-blog-dto';
import { clearDb } from '../../utils/clear-db';
import { createBlog } from '../../utils/blogs/create-blog';
import { getBlogById } from '../../utils/blogs/get-blog-by-id';
import { runDB, stopDb } from '../../../src/db/mongo.db';

describe('Blog API body validation check', () => {
  const app = express();
  setupApp(app);

  const correctTestBlogData: BlogInput = getBlogDto();

  const adminToken = generateBasicAuthToken();

  beforeAll(async () => {
    await clearDb(app);
  });

  afterAll(async () => {
        await stopDb();
    });

  it(`❌ should not create blog when incorrect body passed; POST /blogs'`, async () => {
    await request(app)
      .post(BLOGS_PATH)
      .send(correctTestBlogData)
      .expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: '   ', // empty string
        description: '    ', // empty string
        websiteUrl: 'invalid url', // incorrect url
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'test',
        description: '',
        websiteUrl: 'https://samurai.it-incubator.io/swagger?id=h02',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'test', 
        description: 'testing',
        websiteUrl: 'invalid url', // incorrect url
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(4);

    // check что никто не создался
    const blogListResponse = await request(app)
      .get(BLOGS_PATH)
      .set('Authorization', adminToken);
    expect(blogListResponse.body).toHaveLength(0);
  });

  it('❌ should not update blog when incorrect data passed; PUT /blogs/:id', async () => {
    const createdBlog = await createBlog(app, correctTestBlogData);

    const invalidDataSet1 = await request(app)
      .put(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: '   ', // empty string
        description: '    ', // empty string
        websiteUrl: 'invalid url', // incorrect url
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .put(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'test',
        description: '',
        websiteUrl: 'https://samurai.it-incubator.io/swagger?id=h02',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(3);

    const invalidDataSet3 = await request(app)
      .put(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'test', 
        description: 'testing',
        websiteUrl: 'invalid url', // incorrect url
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    const blogResponse = await getBlogById(app, createdBlog.id);

    expect(blogResponse).toEqual({
      ...correctTestBlogData,
      id: createdBlog.id,
      createdAt: expect.any(String),
    });
  });
});