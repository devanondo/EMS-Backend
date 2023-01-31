import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from '../controllers/clientController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { permissionTo } from '../middleware/permissions.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { clientRegisterValidator } from '../middleware/validators/clientValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// Create client account
router.post(
  '/',
  clientRegisterValidator(),
  validate,
  isAuthenticatedUser,
  permissionTo('client', 'write'),
  restrictTo('superadmin', 'admin'),
  createClient
);

// Get Client Account details
router.get('/', isAuthenticatedUser, permissionTo('client', 'read'), getClient);

// Update Client Account
router.put(
  '/:id',
  isAuthenticatedUser,
  permissionTo('client', 'update'),
  restrictTo('superadmin', 'admin'),
  updateClient
);

// Delete Client Account
router.delete(
  '/:id',
  isAuthenticatedUser,
  permissionTo('client', 'delete'),
  restrictTo('superadmin'),
  deleteClient
);

export const clientRoute = router;
