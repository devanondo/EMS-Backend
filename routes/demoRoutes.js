import { Router } from 'express';
import { createDemo, getDemos } from '../controllers/demoController.js';
import { demoValidateRules } from '../middleware/validators/demoValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getDemos);
router.post('/', demoValidateRules(), validate, createDemo);

export const demoRoutes = router;
