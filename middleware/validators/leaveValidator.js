import { body } from 'express-validator';

export const leaveValidateRules = () => {
  return [
    body('leaveType').isString().notEmpty(),
    body('from').isString().notEmpty(),
    body('to').isString().notEmpty(),
    body('leaveReason').isString().notEmpty(),
  ];
};
