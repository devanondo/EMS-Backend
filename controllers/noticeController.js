import { Notice } from '../models/noticeModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

//Create notice
export const createNotice = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  await Notice.create(req.body);

  res.status(200).json({ message: 'Notice create Successfully!' });
});

//Get Notice --Admin
export const getAllNoticeAdmin = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(
    Notice.find()
      .lean()
      .sort({ updatedAt: -1 })
      .populate('creator', ['username', 'avatar', 'designation', 'email']),
    req.query
  )
    .searchByDate()
    .pagination();
  const notice = await apiFeatures.query;

  const apiFeatures2 = new ApiFeatures(
    Notice.find().lean().sort({ updateAt: -1 }),
    req.query
  ).searchByDate();
  const notice2 = await apiFeatures2.query;

  res.status(200).json({
    status: 'success',
    data: notice,
    count: notice2.length,
  });
});

//Get Notice
export const getAllNotice = catchAsync(async (req, res, next) => {
  const notice = await Notice.find({ status: 'approved' })
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'avatar', 'designation', 'email']);

  res.status(200).json({
    status: 'success',
    data: notice,
  });
});

//Get Notice
export const changeNoticeStatus = catchAsync(async (req, res, next) => {
  const { id, status } = req.query;

  const notice = await Notice.findById(id);

  if (!notice) return next(new AppError('Notice not found!', 404));

  await Notice.findByIdAndUpdate(
    { _id: id },
    { status: status },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    status: 'success',
    data: notice,
  });
});

//GDelete notice
export const deleteNotice = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const notice = await Notice.findById(id);

  if (!notice) return next(new AppError('Notice not found!', 404));

  await notice.remove();

  res.status(200).json({
    status: 'success',
    message: 'Notice deleted successfully',
  });
});
