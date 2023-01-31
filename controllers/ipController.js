import { Ip } from '../models/ipModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createIp = catchAsync(async (req, res, next) => {
  await Ip.create(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Ip Created Successfully',
  });
});

export const updateIp = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  await Ip.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    status: 'success',
    message: 'Ip Updated Successfully',
  });
});

export const activeIp = catchAsync(async (req, res, next) => {
  const { id, status } = req.body;

  const ip = await Ip.findById({ _id: id });

  if (ip.status === 'active') {
    return next(new AppError('This IP already activated!'));
  }

  const otherIp = await Ip.findOne({ status: 'active' });

  if (otherIp) {
    otherIp.status = 'inactive';
    await otherIp.save({ validateBeforeSave: false });
  }

  ip.status = status;
  await ip.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'IP Activated successfully',
  });
});

export const removeIp = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const ip = await Ip.findById({ _id: id });
  if (ip.status === 'active') {
    return next(new AppError('Please Inactive first!'));
  }

  await ip.remove();
  res.status(200).json({
    status: 'success',
    message: 'IP deleted successfully',
  });
});

export const getIp = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.id) {
    filter._id = req.query.id;
  }
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const ip = await Ip.find(filter).lean();

  res.status(200).json({
    status: 'success',
    data: ip,
  });
});
