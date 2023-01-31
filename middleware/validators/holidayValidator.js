import { body } from 'express-validator';

export const holidayValidateRules = () => {
  return [
    body('holidayName').isString().notEmpty(),
    body('holidayStart').isString().notEmpty(),
    body('holidayEnd').isString().notEmpty(),
  ];
};
