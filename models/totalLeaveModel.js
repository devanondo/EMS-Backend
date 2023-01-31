import { model, Schema } from 'mongoose';

const TotalLeave = new Schema(
  {
    leaveType: [
      {
        title: String,
        days: Number,
        description: String,
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const TotalLeaves = model('TotalLeaves', TotalLeave);
