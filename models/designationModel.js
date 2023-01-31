import mongoose, { model, Schema } from 'mongoose';

const DesignationModel = new Schema(
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

export const Designations = model('Designation', DesignationModel);
