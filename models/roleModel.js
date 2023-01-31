import mongoose, { model, Schema } from 'mongoose';

const RoleModel = new Schema(
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

export const Roles = model('Role', RoleModel);
