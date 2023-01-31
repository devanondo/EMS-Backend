import mongoose, { model, Schema } from 'mongoose';

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,

      default: 'pending',
    },
    description: String,
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Notice = model('Notice', NoticeSchema);
