import { Router } from 'express';
import {
  createAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendanceByDate,
  getUserAttendance,
} from '../controllers/attendanceController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { permissionTo } from '../middleware/permissions.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

// isAuthenticatedUser, restrictTo('superadmin', 'admin'),

// routes
router.get(
  '/',
  isAuthenticatedUser,
  permissionTo('attendance', 'read'),
  restrictTo('superadmin', 'admin'),
  getAllAttendance
);

//Get user employee
router.get('/user', isAuthenticatedUser, getUserAttendance);

//Get attendance by date
router.get(
  '/date',
  isAuthenticatedUser,
  permissionTo('attendance', 'read'),
  restrictTo('superadmin', 'admin'),
  getAttendanceByDate
);

//Create attendance
router.post('/', isAuthenticatedUser, createAttendance);

//Delete attendance
router.delete('/', deleteAttendance);

export const AttendanceRoutes = router;
