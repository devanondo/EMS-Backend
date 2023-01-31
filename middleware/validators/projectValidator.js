import { body } from 'express-validator';

export const projectValidateRules = () => {
  return [
    body('projectName').isString().notEmpty(),
    body('client').isString().notEmpty(),
    body('startDate').isString().notEmpty(),
    body('endDate').isString().notEmpty(),
    body('rate').isString().notEmpty(),
    body('priority').isString().notEmpty(),
    body('projectLeader').isString().notEmpty(),
    body('address').isString().notEmpty(),
    body('description').isString().notEmpty(),
    
  ];
};
