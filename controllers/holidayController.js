import { Holiday } from '../models/holidayModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

// Create a Holiday
export const createHoliday = catchAsync(async (req, res) => {
  const { holidayName, totalHoliday, holidayStart, holidayEnd } = req.body;
  const diffInMs = new Date(holidayEnd) - new Date(holidayStart);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

  if (diffInDays > 0) {
    await Holiday.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Holiday Created Successfully',
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please change your date',
    });
  }
});

// Get single/all Holiday
export const getHolidays = catchAsync(async (req, res, next) => {
  // const { did } = req.query;
  // const filters = {};

  // if (did) {
  //   filters._id = did;
  //   const holiday = await Holiday.find(filters).lean().sort({ holidayStart: 1 });
  //   if (!holiday) return next(new AppError('Holidays not found..!', 404));

  //   res.status(200).json({
  //     status: 'success',
  //     data: holiday,
  //   });
  // } else {
  const apiFeatures = new ApiFeatures(
    Holiday.find().lean().sort({ holidayStart: 1 }),
    req.query
  ).searchHoliday();

  const holiday = await apiFeatures.query;

  // const holiday = await Holiday.find().lean().sort({ holidayStart: 1 });
  res.status(200).json({
    status: 'success',
    data: holiday,
    count: holiday.length,
  });
  // }
});

// Update a Holiday
export const updateHoliday = catchAsync(async (req, res) => {
  const UpdateHoliday = await Holiday.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    message: 'Holiday Update Successfully',
  });
});

// Delete all Holiday
export const deleteHoliday = catchAsync(async (req, res) => {
  await Holiday.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Holiday Delete Successfully',
  });
});
