import mongoose, { model, Schema } from 'mongoose';

const EmployeeTypeModel = new Schema(
  {
    title: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const EmployeeType = model('employeeType', EmployeeTypeModel);
