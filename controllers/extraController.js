import { Departments } from '../models/departmentModel.js';
import { Designations } from '../models/designationModel.js';
import { EmployeeType } from '../models/employeeTypeModel.js';
import { Roles } from '../models/roleModel.js';
import { User } from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

//Create Role
export const createRole = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await Roles.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }
  res.status(200).json({
    status: 'success',
    message: 'Role Created Successfully',
  });
});

//Get all Role
export const getAllRole = catchAsync(async (req, res, next) => {
  const roles = await Roles.find()
    .lean()
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: roles,
  });
});

//Update Role
export const updateRole = catchAsync(async (req, res, next) => {
  const role = await Roles.findById(req.body.id);
  if (!role) return next(new AppError('Role not found', 404));

  const isExistRole = await User.findOne({ role: role.title });

  if (isExistRole) {
    return next(new AppError(`Role already used  \n ID:  ${isExistRole.idno}`, 404));
  }

  await Roles.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: 'true',
    useFindAndModify: 'false',
  });

  res.status(200).json({
    status: 'success',
    message: 'Role updated successfully',
  });
});

//Delete Role
export const deleteRole = catchAsync(async (req, res, next) => {
  const role = await Roles.findById(req.query.id);
  if (!role) return next(new AppError('Role not found', 404));

  const isExistRole = await User.findOne({ role: role.title });

  if (isExistRole) {
    return next(new AppError(`Role already used  \n ID:  ${isExistRole.idno}`, 404));
  }

  await Roles.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Role Deleted successfully',
  });
});

// -----------DESIGNATION------------

//Create designation
export const createDesignation = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await Designations.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }
  res.status(200).json({
    status: 'success',
    message: 'Designation Created Successfully',
  });
});

//Get all designation
export const getAllDesignation = catchAsync(async (req, res, next) => {
  const designation = await Designations.find()
    .lean()
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: designation,
  });
});

//Update designation
export const updateDesignation = catchAsync(async (req, res, next) => {
  const designation = await Designations.findById(req.body.id);
  if (!designation) return next(new AppError('Designation not found', 404));

  const isExistDesignation = await User.findOne({ designation: designation.title });

  if (isExistDesignation) {
    return next(new AppError(`Designation already used \n ID:  ${isExistDesignation.idno}`, 404));
  }

  await Designations.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: 'true',
    useFindAndModify: 'false',
  });

  res.status(200).json({
    status: 'success',
    message: 'Designation updated successfully',
  });
});

//Delete designation
export const deleteDesignation = catchAsync(async (req, res, next) => {
  const designation = await Designations.findById(req.query.id);
  if (!designation) return next(new AppError('Designation not found', 404));

  const isExistDesignation = await User.findOne({ designation: designation.title });

  if (isExistDesignation) {
    return next(new AppError(`Designation already used! \n ID:  ${isExistDesignation.idno}`, 404));
  }

  await Designations.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Designation Deleted successfully',
  });
});

// ----------DEPARTMENT------------

//Create Department
export const createDepartment = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await Departments.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }
  res.status(200).json({
    status: 'success',
    message: 'Department Created Successfully',
  });
});

//Get all department
export const getAllDepartment = catchAsync(async (req, res, next) => {
  const department = await Departments.find()
    .lean()
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: department,
  });
});

//Update Department
export const updateDepartment = catchAsync(async (req, res, next) => {
  const department = await Departments.findById(req.body.id);
  if (!department) return next(new AppError('Department not found', 404));

  const isExistDepartment = await User.findOne({ department: department.title });

  if (isExistDepartment) {
    return next(new AppError(`Department already used  \n ID: ${isExistDepartment.idno}`, 404));
  }

  await Departments.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: 'true',
    useFindAndModify: 'false',
  });

  res.status(200).json({
    status: 'success',
    message: 'Role updated successfully',
  });
});

//Delete Department
export const deleteDepartment = catchAsync(async (req, res, next) => {
  const department = await Departments.findById(req.query.id);
  if (!department) return next(new AppError('Department not found', 404));

  const isExistDepartment = await User.findOne({ department: department.title });

  if (isExistDepartment) {
    return next(new AppError(`Department already used  \n ID: ${isExistDepartment.idno}`, 404));
  }

  await Departments.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Department Deleted successfully',
  });
});

//employee permissions
//Update permission
export const updatePermission = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const employee = await User.findById(id);
  if (!employee) {
    return next(new AppError('Employee not Found!', 404));
  }

  if (req.user.role === employee.role) {
    return next(new AppError("Can't change yourself!", 404));
  }

  employee.permissions = req.body;

  await employee.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Permission Updated!',
  });
});

// ----------Employee type------------

//Create Department
export const createType = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await EmployeeType.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }

  res.status(200).json({
    status: 'success',
    message: 'Type Created Successfully',
  });
});

//Get all department
export const getAllType = catchAsync(async (req, res, next) => {
  const type = await EmployeeType.find()
    .lean()
    .sort({ createdAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: type,
  });
});

//Update Department
export const updateType = catchAsync(async (req, res, next) => {
  const type = await EmployeeType.findById(req.body.id);
  if (!type) return next(new AppError('Type not found', 404));

  const isExistType = await User.findOne({ type: type.title });

  if (isExistType) {
    return next(new AppError(`Type already used  \n ID: ${isExistType.idno}`, 404));
  }

  await EmployeeType.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: 'true',
    useFindAndModify: 'false',
  });

  res.status(200).json({
    status: 'success',
    message: 'Type updated successfully',
  });
});

//Employee Type
export const deleteType = catchAsync(async (req, res, next) => {
  const type = await EmployeeType.findById(req.body.id);
  if (!type) return next(new AppError('Type not found', 404));

  const isExistType = await User.findOne({ type: type.title });

  if (isExistType) {
    return next(new AppError(`Type already used  \n ID: ${isExistType.idno}`, 404));
  }

  await Departments.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Department Deleted successfully',
  });
});
