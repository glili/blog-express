import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BlogInput } from '../../../src/blogs/dto/blog.input';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { getBlogDto } from '../../utils/blogs/get-blog-dto';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { createBlog } from '../../utils/blogs/create-blog';
import { clearDb } from '../../utils/clear-db';
import { getBlogById } from '../../utils/blogs/get-blog-by-id';
import { updateBlog } from '../../utils/blogs/update-blog';
import { runDB } from '../../../src/db/mongo.db';

describe('Blog API', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeAll(async () => {
    await runDB(
        'mongodb+srv://admin:admin@lesson.oxuydeq.mongodb.net/?retryWrites=true&w=majority&appName=lesson',
    );
    await clearDb(app);
  });

  it('✅ should create blog; POST /blogs', async () => {
    const newBlog: BlogInput = {
      ...getBlogDto(),
      name: 'Tech',
      websiteUrl: 'https://samurai.it-incubator.io/swagger?id=h02',
    };

    await createBlog(app, newBlog);
  });

  it('✅ should return blogs list; GET /blogs', async () => {
    await createBlog(app);
    await createBlog(app);

    const response = await request(app)
      .get(BLOGS_PATH)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('✅ should return BLOG by id; GET /blogs/:id', async () => {
    const createdBlog = await createBlog(app);

    const blog = await getBlogById(app, createdBlog.id);

    expect(blog).toEqual({
      ...createdBlog,
      id: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('✅ should update blog; PUT /blogs/:id', async () => {
    const createdBlog = await createBlog(app);

    const blogUpdateData: BlogInput = {
      name: 'Updated Name',
      description: 'test2',
      websiteUrl: 'https://samurai.it-incubator.io/swagger?id=h03',
    };

    await updateBlog(app, createdBlog.id, blogUpdateData);

    const blogResponse = await getBlogById(app, createdBlog.id);

    expect(blogResponse).toEqual({
      id: createdBlog.id,
      name: blogUpdateData.name,
      description: blogUpdateData.description,
      websiteUrl: blogUpdateData.websiteUrl,
      createdAt: expect.any(String),
      isMembership: createdBlog.isMembership
    });
  });

  it('✅ should delete blog and check after "NOT FOUND"; DELETE /blogs/:id', async () => {
    const createdBlog = await createBlog(app);

    await request(app)
      .delete(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.NotFound);
  });
  // it('✅ should delete blog and check after "NOT FOUND"; DELETE /blogs/:id', async () => {
  //   await clearDb(app);
  // });
});