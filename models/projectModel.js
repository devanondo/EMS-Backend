import mongoose, { model, Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      default: '',
      required: [true, 'Project Name is required'],
    },

    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
    },

    startDate: {
      type: String,
      default: '',
      required: [true, 'Start Date is required'],
    },

    endDate: {
      type: String,
      default: '',
      required: [true, 'End Date is required'],
    },

    openTask: {
      type: Number,
      default: 0,
    },
    completedTask: {
      type: Number,
      default: 0,
    },

    rate: {
      type: String,
      default: '',
      required: [true, 'Rate is required'],
    },

    priority: {
      type: String,
      default: '',
      required: [true, 'Priority is required'],
    },

    completed: {
      type: Number,
      default: 0,
      required: [true, 'Completed is required'],
    },

    projectLeader: {
      type: String,
      default: '',
      required: [true, 'Project Leader is required'],
    },

    teamMember: {
      type: Array,
      default: '',
      required: [true, 'Team Member is required'],
    },

    completed: {
      type: Number,
      default: 0,
    },

    address: {
      type: String,
      default: '',
      required: [true, 'Address is required'],
    },

    description: {
      type: String,
      default: '',
      required: [true, 'description is required'],
    },

    file: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Project = model('Project', ProjectSchema);
