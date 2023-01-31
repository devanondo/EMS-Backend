import { model, Schema } from 'mongoose';

const DemoSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
      required: [true, 'Title is required'],
    },
  },
  { timestamps: true }
);

export const Demo = model('Demo', DemoSchema);
