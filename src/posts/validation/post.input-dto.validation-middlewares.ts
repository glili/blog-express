import { body } from 'express-validator';

const titleValidation = body('title')
  .isString()
  .withMessage('title should be string')
  .trim()
  .isLength({ min: 2, max: 30 })
  .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('short description should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of short description is not correct');

const contentValidation = body('content')
  .isString()
  .withMessage('content should be string')
  .trim()
  .isLength({ min: 2, max: 1000 })
  .withMessage('Length of content is not correct');

  const blogIdValidation = body('blogId')
  .isString()
  .withMessage('ID must be a string');

export const postInputDtoValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];