import mongoose, { model, Schema } from 'mongoose';

const AttendanceSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    attendance: [
      {
        status: String,
        time: Date,
      },
    ],
  },
  { timestamps: true }
);

export const Attendance = model('Attendance', AttendanceSchema);
