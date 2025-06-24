import { body } from 'express-validator';

const titleValidation = body('title')
    .isString()
    .withMessage('title should be string')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Length of title is not correct');


const shortDescriptionValidation = body('shortDescription')
    .isString()
    .withMessage('shortDescription should be string')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Length of shortDescription is not correct');

const contentValidation = body('content')
    .isString()
    .withMessage('content should be string')
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage('Length of content is not correct');

export const blogIdValidation = body('blogId')
    .isString()
    .withMessage('ID must be a string')
    .trim()
    .isMongoId()
    .withMessage('Wrong ObjectId format');


export const postInputDtoValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
];