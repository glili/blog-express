import express, { Express } from 'express';
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from './core/paths/paths';
import { blogsRouter } from './blogs/routers/blogs.router';
import { postsRouter } from './posts/routers/posts.router';
import { testingRouter } from './testing/routers/testing.router';

export const setupApp = (app: Express) => {
  app.use(express.json());
  //
  // app.get('/', (req, res) => {
  //   res.status(200).send('Blog app!');
  // });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(TESTING_PATH, testingRouter);
  app.use(POSTS_PATH, postsRouter);

  return app;
};