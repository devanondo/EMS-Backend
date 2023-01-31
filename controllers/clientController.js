import { Client } from '../models/clientModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Create Client Account
export const createClient = catchAsync(async (req, res, next) => {
  const { name, phoneNumber, email, joinDate, address, country } = req.body;

  const user = await Client.findOne({ email });
  if (user) return next(new AppError('Client already exists..!', 403));

  await Client.create({
    name,
    phoneNumber,
    address,
    joinDate,
    email,
    country,
    createdBy: req.user._id,
  });
  res.status(200).json({
    status: 'success',
    message: 'Client created successfully',
  });
});

// Update client account
export const updateClient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = Client.findOne({ _id: id });
  if (!client) return next(new AppError('Account not found!', 404));

  await Client.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: 'success',
    message: 'Client Updated successfully',
  });
});

// Get all Client
export const getClient = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const filters = {};

  if (id) filters._id = id;

  const clients = await Client.find(filters).lean().sort({ updatedAt: -1 });

  res.status(200).json({
    status: 'success',
    data: clients,
  });
});

// Delete client Account
export const deleteClient = catchAsync(async (req, res, next) => {
  await Client.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: 'success',
    message: 'Client Delete Successfully',
  });
});
