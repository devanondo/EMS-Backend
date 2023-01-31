import moment from 'moment';
import { Attendance } from '../models/attendanceModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

export const createAttendance = catchAsync(async (req, res, next) => {
  const today = moment().startOf('day');

  const attendance = await Attendance.findOne({
    user: req.body.user,
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate(),
    },
  });

  if (!attendance) {
    const data = {
      user: req.body.user,
      attendance: [
        {
          status: req.body.status,
          time: new Date(),
        },
      ],
    };

    await Attendance.create(data);

    res.status(200).json({
      status: 'success',
      message: `${req.body.status} Successfully!`,
    });
  }

  attendance.attendance.push({
    status: req.body.status,
    time: new Date(),
  });

  await attendance.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: `${req.body.status} Successfully!`,
  });
});

//Get all Attendance
export const getAllAttendance = catchAsync(async (req, res, next) => {
  const filters = {};

  if (req.params.id) {
    filters.id = req.params.id;
  }

  const apiFeatures2 = new ApiFeatures(
    Attendance.find(filters).lean().sort({ updatedAt: -1 }).populate('user', ['username']),
    req.query
  ).searchByDate();

  const attendance2 = await apiFeatures2.query;
  const apiFeatures = new ApiFeatures(
    Attendance.find(filters)
      .lean()
      .sort({ updatedAt: -1 })
      .populate('user', ['username', 'avatar', 'idno']),
    req.query
  )
    .searchByDate()
    .pagination();

  const attendance = await apiFeatures.query;

  res.status(200).json({
    status: 'success',
    data: attendance,
    count: attendance2.length,
  });
});

//get attendance pertculer date
export const getAttendanceByDate = catchAsync(async (req, res, next) => {
  const today = moment(req.query.date, 'MM/DD/YYYY').startOf('day');

  const apiFeatures2 = new ApiFeatures(
    Attendance.find({
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    })
      .lean()
      .sort({ updatedAt: -1 }),
    req.query
  );
  const attendance2 = await apiFeatures2.query;

  const apiFeatures = new ApiFeatures(
    Attendance.find({
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    })
      .lean()
      .sort({ updatedAt: -1 })
      .populate('user', ['username', 'avatar', 'idno', 'designation', 'idno']),
    req.query
  ).pagination();

  const attendance = await apiFeatures.query;
  res.status(200).json({
    status: 'success',
    data: attendance,
    count: attendance2.length,
  });
});

//Get user Attendance
export const getUserAttendance = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(
    Attendance.find({ user: req.query.id })
      .lean()
      .sort({ updatedAt: -1 })
      .populate('user', ['username', 'avatar', 'idno']),
    req.query
  )
    .searchByDate()
    .pagination();
  const apiFeatures2 = new ApiFeatures(
    Attendance.find({ user: req.query.id }).lean().sort({ updatedAt: -1 }),
    req.query
  ).searchByDate();

  const attendance = await apiFeatures.query;
  const attendance2 = await apiFeatures2.query;

  res.status(200).json({
    status: 'success',
    data: attendance,
    count: attendance2.length,
  });
});
//Get Delete Attendance
export const deleteAttendance = catchAsync(async (req, res, next) => {
  const ids = await Attendance.findByIdAndDelete(req.query.id);
  console.log(ids);
  res.status(200).json({
    status: 'success',
  });
});
