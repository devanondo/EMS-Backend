import { Project } from '../models/projectModel.js';
import { Task } from '../models/taskModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

//Create Task
export const createTask = catchAsync(async (req, res) => {
  const { _id } = req.user;

  req.body.assignFrom = _id;

  const project = await Project.findById(req.body.project);

  project.openTask += 1;

  await project.save();
  const task = await Task.create(req.body);

  if (!task) {
    return next(new AppError('Internal Server Error'));
  }

  res.status(200).json({
    status: 'success',
    message: 'Task added successfully',
  });
});

//Update task
export const updateTask = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { tid } = req.query;
  const roles = ['superadmin', 'admin', 'pm'];

  let task = await Task.findById(tid).populate('assignFrom', ['role']);

  if (!task) {
    return next(new AppError('Internal Server Error'));
  }

  if (task.assignFrom._id.toString() !== _id.toString() || !roles.includes(req.user.role))
    return next(new AppError('Error! Not access !'));

  const newTask = await Task.findByIdAndUpdate(tid, req.body, { new: true });

  res.status(200).json({
    status: 'success',
    message: 'Task updated successfully',
  });
});

//Get all task or single task
export const getTask = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const filters = {};

  if (id) {
    filters._id = id;
  }

  const apiFeatures = new ApiFeatures(
    Task.find(filters)
      .lean()
      .sort({ updatedAt: -1 })
      .populate('assignTo', ['username', 'designation'])
      .populate('assignFrom', ['username', 'designation'])
      .populate('project', ['projectName', 'teamMember']),
    req.query
  )
    .searchTitle()
    .pagination();

  const apiFeatures2 = new ApiFeatures(
    Task.find(filters).lean().sort({ updatedAt: -1 }),
    req.query
  ).searchTitle();

  const tasks = await apiFeatures.query;
  const tasks2 = await apiFeatures2.query;

  res.status(200).json({
    status: 'success',
    data: tasks,
    count: tasks2.length,
  });
});

//Edit or change status task
export const changeTaskStatus = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.query.id).populate('project', ['projectName', 'teamMember']);

  if (!task) return next(new AppError('Task is not found!', 404));

  const isExistUser = task.project.teamMember.find(
    (item) => item._id.toString() === req.user._id.toString()
  );

  if (!isExistUser) return next(new AppError('Not access to change status!'));

  if (task.status === 'completed') {
    return next(new AppError('Task already completed!', 404));
  }

  task.status = req.query.status;

  await task.save({ validateBeforeSave: false });

  if (req.query.status === 'completed') {
    const project = await Project.findById(task.project);

    project.openTask -= 1;

    project.completedTask += 1;

    await project.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: 'success',
    message: `Status updated to ${req.query.status}`,
  });
});

//Get task as per user`
export const getUserTask = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const tasks = await Task.find({ assignTo: id })
    .lean()
    .sort({ updatedAt: -1 })
    .populate('assignTo', ['username', 'designation'])
    .populate('assignFrom', ['username', 'designation'])
    .populate('project', ['projectName', 'teamMember']);

  res.status(200).json({
    status: 'success',
    data: tasks,
    count: tasks.length,
  });
});

//Get task as per project
export const getProjectTask = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const tasks = await Task.find({ project: id })
    .lean()
    .sort({ updatedAt: -1 })
    .populate('assignTo', ['username', 'designation'])
    .populate('assignFrom', ['username', 'designation'])
    .populate('project', ['projectName', 'teamMember']);

  res.status(200).json({
    status: 'success',
    data: tasks,
  });
});
