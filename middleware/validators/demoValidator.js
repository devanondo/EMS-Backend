import { body } from 'express-validator';

export const demoValidateRules = () => {
  return [body('title').isString().notEmpty()];
};
