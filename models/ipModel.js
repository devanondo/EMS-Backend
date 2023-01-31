import mongoose, { model, Schema } from 'mongoose';

const IpModel = new Schema(
  {
    ip: {
      type: String,
    },
    status: {
      type: String,
      default: 'inactive',
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Ip = model('Ip', IpModel);
