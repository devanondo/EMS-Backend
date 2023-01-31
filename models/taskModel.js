import mongoose, { model, Schema } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: String,
    assignTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    assignFrom: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
    },
    status: {
      type: String,
      required: [true, 'Must be pass status!'],
      default: 'pending',
    },
    assignDate: String,
    dueDate: String,
    description: String,
    note: String,
  },
  { timestamps: true }
);

export const Task = model('Task', TaskSchema);
