import { Router } from 'express';
import {
  changeNoticeStatus,
  createNotice,
  deleteNotice,
  getAllNotice,
  getAllNoticeAdmin,
} from '../controllers/noticeController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

//Create Notice
router.post('/', isAuthenticatedUser, restrictTo('superadmin', 'admin'), createNotice);

//Change status
router.put('/', isAuthenticatedUser, restrictTo('superadmin', 'admin'), changeNoticeStatus);

//Get all notice form admin
router.get('/all', isAuthenticatedUser, restrictTo('superadmin', 'admin'), getAllNoticeAdmin);

//Get all notice
router.get('/', isAuthenticatedUser, getAllNotice);

//Delete notice
router.delete('/', isAuthenticatedUser, restrictTo('superadmin', 'admin'), deleteNotice);

export const noticeRoutes = router;
