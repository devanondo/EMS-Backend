import { Router } from 'express';
import {
  createHoliday,
  deleteHoliday,
  getHolidays,
  updateHoliday,
} from '../controllers/holidayController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { permissionTo } from '../middleware/permissions.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { holidayValidateRules } from '../middleware/validators/holidayValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

//Get holidays for all users
router.get('/', isAuthenticatedUser, permissionTo('holiday', 'read'), getHolidays);

//Create holiday
router.post(
  '/',
  holidayValidateRules(),
  validate,
  isAuthenticatedUser,
  permissionTo('holiday', 'write'),
  restrictTo('admin', 'superadmin'),
  createHoliday
);

//Update holiday
router.put(
  '/:id',
  isAuthenticatedUser,
  permissionTo('holiday', 'update'),
  restrictTo('admin', 'superadmin'),
  updateHoliday
);

//Delete holiday
router.delete(
  '/:id',
  isAuthenticatedUser,
  permissionTo('holiday', 'delete'),
  restrictTo('admin', 'superadmin'),
  deleteHoliday
);

export const HolidayRoutes = router;
