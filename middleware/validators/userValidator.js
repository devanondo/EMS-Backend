import { body } from 'express-validator';

export const userRegisterValidator = () => {
  return [
    body('email').isEmail().notEmpty(),
    body('password')
      .isLength({ min: 4, max: 16 })
      .withMessage('Password must be between 4 to 16 characters')
      .notEmpty(),
  ];
};
