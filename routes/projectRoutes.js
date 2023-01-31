import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProjectByEmployee,
  getProjects,
  progressUpdate,
  updateProject,
} from '../controllers/ProjectController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { projectValidateRules } from '../middleware/validators/projectValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
//Get Projects
router.get('/', isAuthenticatedUser, getProjects);

//Get project by user
router.get('/user', isAuthenticatedUser, getProjectByEmployee);

//Create Project
router.post(
  '/',
  isAuthenticatedUser,
  restrictTo('admin', 'superadmin', 'pm'),
  projectValidateRules(),
  validate,
  createProject
);

//Update Project
router.put('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin', 'pm'), updateProject);

//Update Progress
router.patch('/:id', isAuthenticatedUser, progressUpdate);

//Delete Project
router.delete('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin', 'pm'), deleteProject);

export const projectRoutes = router;
