import { body } from 'express-validator';

export const clientRegisterValidator = () => {
  return [
    body('name').isString().notEmpty(),
    body('phoneNumber').isString().notEmpty(),
    body('address').isString().notEmpty(),
    body('email').isString().notEmpty(),
    body('joinDate').isString().notEmpty(),
  ];
};
