import { body } from 'express-validator';
const url_REGEX = '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$';

const websiteUrlValidation = body('websiteUrl')
    .isString()
    .withMessage('url should be string')
    .trim()
    .isLength({ min: 8, max: 100 })
    .withMessage('Length of url is not correct')
    .isURL();

const nameValidation = body('name')
  .isString()
  .withMessage('name should be string')
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
  .isString()
  .withMessage('description should be string')
  .trim()
  .isLength({ min: 2, max: 500 })
  .withMessage('Length of description is not correct');

export const blogInputDtoValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];