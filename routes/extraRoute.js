import { Router } from 'express';
import {
  createDepartment,
  createDesignation,
  createRole,
  createType,
  deleteDepartment,
  deleteDesignation,
  deleteRole,
  deleteType,
  getAllDepartment,
  getAllDesignation,
  getAllRole,
  getAllType,
  updateDepartment,
  updateDesignation,
  updatePermission,
  updateRole,
  updateType,
} from '../controllers/extraController.js';
import { activeIp, createIp, getIp, removeIp, updateIp } from '../controllers/ipController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { permissionTo } from '../middleware/permissions.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

//create a new ROLE
router.post(
  '/role',
  isAuthenticatedUser,
  permissionTo('configuration', 'write'),
  restrictTo('superadmin', 'admin'),
  createRole
);

//Get all Roles
router.get(
  '/role',
  isAuthenticatedUser,
  permissionTo('configuration', 'read'),
  restrictTo('superadmin', 'admin'),
  getAllRole
);

//Update role
router.put(
  '/role',
  isAuthenticatedUser,
  permissionTo('configuration', 'update'),
  restrictTo('superadmin', 'admin'),
  updateRole
);

//Delete role
router.delete(
  '/role',
  isAuthenticatedUser,
  permissionTo('configuration', 'delete'),
  restrictTo('superadmin', 'admin'),
  deleteRole
);

// ---------------DESIGNATION-----------------

//create a new Designation
router.post(
  '/designation',
  isAuthenticatedUser,
  permissionTo('configuration', 'write'),
  restrictTo('superadmin', 'admin'),
  createDesignation
);

//Get all Designation
router.get(
  '/designation',
  isAuthenticatedUser,
  permissionTo('configuration', 'read'),
  restrictTo('superadmin', 'admin'),
  getAllDesignation
);

//Update Designation
router.put(
  '/designation',
  isAuthenticatedUser,
  permissionTo('configuration', 'update'),
  restrictTo('superadmin', 'admin'),
  updateDesignation
);

//Delete Designation
router.delete(
  '/designation',
  isAuthenticatedUser,
  permissionTo('configuration', 'delete'),
  restrictTo('superadmin', 'admin'),
  deleteDesignation
);

// ---------------DEPARTMENT-----------------

//create a new Departments
router.post(
  '/department',
  isAuthenticatedUser,
  permissionTo('configuration', 'write'),
  restrictTo('superadmin', 'admin'),
  createDepartment
);

//Get all Departments
router.get(
  '/department',
  isAuthenticatedUser,
  permissionTo('configuration', 'read'),
  restrictTo('superadmin', 'admin'),
  getAllDepartment
);

//Update Departments
router.put(
  '/department',
  isAuthenticatedUser,
  permissionTo('configuration', 'update'),
  restrictTo('superadmin', 'admin'),
  updateDepartment
);

//Delete Departments
router.delete(
  '/department',
  isAuthenticatedUser,
  permissionTo('configuration', 'delete'),
  restrictTo('superadmin', 'admin'),
  deleteDepartment
);

// ---------------IP-----------------

//Create Ip
router.post('/ip', isAuthenticatedUser, restrictTo('superadmin', 'it'), createIp);

//Update Ip
router.patch('/ip', isAuthenticatedUser, restrictTo('superadmin', 'it'), updateIp);

//active Ip
router.put('/ip', isAuthenticatedUser, restrictTo('superadmin', 'it'), activeIp);

//Delete Ip
router.delete('/ip', isAuthenticatedUser, restrictTo('superadmin', 'it'), removeIp);

//Get IP
router.get('/ip', isAuthenticatedUser, getIp);

//Update employee permissions
router.patch(
  '/permission',
  isAuthenticatedUser,
  permissionTo('configuration', 'update'),
  restrictTo('admin', 'superadmin'),
  updatePermission
);

// ---------------Employee Type-----------------

//create a new Departments
router.post(
  '/type',
  isAuthenticatedUser,
  permissionTo('configuration', 'write'),
  restrictTo('superadmin', 'admin'),
  createType
);

//Get all Departments
router.get(
  '/type',
  isAuthenticatedUser,
  permissionTo('configuration', 'read'),
  restrictTo('superadmin', 'admin'),
  getAllType
);

//Update Departments
router.put(
  '/type',
  isAuthenticatedUser,
  permissionTo('configuration', 'update'),
  restrictTo('superadmin', 'admin'),
  updateType
);

//Delete Departments
router.delete(
  '/type',
  isAuthenticatedUser,
  permissionTo('configuration', 'delete'),
  restrictTo('superadmin', 'admin'),
  deleteType
);

export const extraRoute = router;
