import { Router } from 'express';
import {
  changeTaskStatus,
  createTask,
  getProjectTask,
  getTask,
  getUserTask,
  updateTask,
} from '../controllers/taskController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

//Create task
router.post('/', isAuthenticatedUser, createTask);

//get All task
router.get('/', isAuthenticatedUser, getTask);

//Change status of task
router.put('/', isAuthenticatedUser, changeTaskStatus);

//Update task
router.put('/update', isAuthenticatedUser, restrictTo('admin', 'superadmin', 'pm'), updateTask);

//Get user task
router.get('/user', isAuthenticatedUser, getUserTask);

//Get task project wise
router.get('/project', isAuthenticatedUser, getProjectTask);

export const taskRoute = router;
