import { body } from 'express-validator';

export const attendanceValidateRules = () => {
  return [
    body('punchIn').isString().notEmpty(),
    body('punchOut').isString().notEmpty(),
    body('production').isString().notEmpty(),
    body('break').isString().notEmpty(),
    body('overtime').isString().notEmpty(),
  ];
};
