import mongoose, { model, Schema } from 'mongoose';

const DepartmentModel = new Schema(
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

export const Departments = model('Department', DepartmentModel);
