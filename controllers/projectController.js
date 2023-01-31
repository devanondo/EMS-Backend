import { Project } from '../models/projectModel.js';
import { User } from '../models/userModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Create a project
export const createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);

  project.teamMember.reduce(async (acc, curr) => {
    const users = await User.findById(curr._id);

    users.project.push(project._id);
    await users.save({ validateBeforeSave: false });
    return acc;
  }, []);

  res.status(201).json({
    status: 'success',
    message: 'Project Created Successfully',
  });
});

// Get single/all project
export const getProjects = catchAsync(async (req, res) => {
  const { did } = req.query;
  const filters = {};

  if (did) {
    filters._id = did;
  }

  const apiFeatures = new ApiFeatures(
    Project.find(filters).lean().sort({ createdAt: -1 }).populate('client'),
    req.query
  )
    .searchTitle()
    .pagination();

  const apiFeatures2 = new ApiFeatures(
    Project.find(filters).lean().sort({ createdAt: -1 }),
    req.query
  ).searchTitle();

  const projects = await apiFeatures.query;
  const projects2 = await apiFeatures2.query;

  res.status(200).json({
    status: 'success',
    data: projects,
    count: projects2.length,
  });
});

//Get project by employee
export const getProjectByEmployee = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const employee = await User.findById({ _id: id });

  if (!employee) return next(new AppError('Employee not found!'));

  const project = await Project.find().populate('client');

  const personalProject = project.reduce((acc, curr) => {
    curr.teamMember.map((item) => {
      if (item._id.toString() === id.toString()) {
        acc.push(curr);
      }
    });

    return acc;
  }, []);

  res.status(200).json({
    status: 'success',
    data: personalProject,
    count: personalProject.length,
  });
});

// Update a project
export const updateProject = catchAsync(async (req, res) => {
  const UpdateProject = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    message: 'Project Update Successfully',
  });
});

// Update a project
export const progressUpdate = catchAsync(async (req, res) => {
  await Project.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(201).json({
    status: 'success',
    message: 'Project Update Successfully',
  });
});

// Delete all project
export const deleteProject = catchAsync(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Project Delete Successfully',
  });
});
