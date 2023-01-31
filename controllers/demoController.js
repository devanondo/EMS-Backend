import { Demo } from '../models/demoModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createDemo = catchAsync(async (req, res) => {
  const { title } = req.body;

  await Demo.create({ title });

  res.status(201).json({
    status: 'success',
    message: 'Demo Created Successfully',
  });
});

export const getDemos = catchAsync(async (req, res) => {
  const { did } = req.query;

  const filters = {};

  if (did) {
    filters._id = did;
  }

  const demos = await Demo.find(filters).lean().sort({ updatedAt: -1 });

  res.status(200).json({
    status: 'success',
    data: demos,
  });
});
