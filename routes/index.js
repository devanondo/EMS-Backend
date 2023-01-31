import { Router } from 'express';
import { clientRoute } from './clientRoute.js';
import { demoRoutes } from './demoRoutes.js';

import { AttendanceRoutes } from './attendanceRoutes.js';
import { HolidayRoutes } from './holidayRoutes.js';
import { leaveRoutes } from './leaveRoutes.js';
import { projectRoutes } from './projectRoutes.js';

import { extraRoute } from './extraRoute.js';
import { noticeRoutes } from './noticeRoute.js';
import { taskRoute } from './taskRoute.js';
import { userRoute } from './userRoute.js';

const router = Router();

router.use('/demo', demoRoutes);
router.use('/project', projectRoutes);
router.use('/leave', leaveRoutes);
router.use('/total-leave', leaveRoutes);
router.use('/holiday', HolidayRoutes);
router.use('/attendance', AttendanceRoutes);
router.use('/admin', extraRoute);
router.use('/task', taskRoute);
router.use('/notice', noticeRoutes);

// User route
router.use('/user', userRoute);

// Client Route
router.use('/client', clientRoute);

export default router;
