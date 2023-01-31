import { Router } from 'express';
import {
  createLeave,
  getAllLeaves,
  getUserLeave,
  updateStatus,
} from '../controllers/LeaveController.js';
import {
  createTotalLeave,
  deleteTotalLeave,
  getTotalLeave,
  updateTotalLeave,
} from '../controllers/totalLeaveController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { permissionTo } from '../middleware/permissions.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

//Create leave
router.post('/create', isAuthenticatedUser, createLeave);

//Update status
router.post(
  '/update',
  isAuthenticatedUser,
  permissionTo('leaves', 'write'),
  restrictTo('superadmin', 'admin'),
  updateStatus
);

//get all leaves
router.get(
  '/',
  isAuthenticatedUser,
  permissionTo('leaves', 'read'),
  restrictTo('superadmin', 'admin'),
  getAllLeaves
);

//Get user leaves
router.get('/user-leave', isAuthenticatedUser, getUserLeave);

// ------------------------------------//

//Create total/all leave
router.post('/all', isAuthenticatedUser, restrictTo('superadmin'), createTotalLeave);

//Get total/all leave
router.get('/all', isAuthenticatedUser, getTotalLeave);

//Update total/all leave
router.patch('/all', isAuthenticatedUser, restrictTo('superadmin'), updateTotalLeave);

//Delete total/all leave
router.delete('/all', isAuthenticatedUser, restrictTo('superadmin'), deleteTotalLeave);

export const leaveRoutes = router;
