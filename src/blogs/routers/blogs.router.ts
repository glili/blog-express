import { Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogHandler } from './handlers/get-blog.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { blogInputDtoValidation } from '../validation/blog.input-dto.validation-middlewares';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

export const blogsRouter = Router({});

blogsRouter.use(superAdminGuardMiddleware);

blogsRouter
  .get('', getBlogListHandler)

  .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)

  .post(
    '',
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .put(
    '/:id',
    idValidation,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    '/:id',
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  );