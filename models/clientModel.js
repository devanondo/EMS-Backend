import mongoose, { model, Schema } from 'mongoose';

const ClientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Client name is required!'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Client designation is required!'],
  },
  email: {
    type: String,
    required: [true, 'Company name is required!'],
  },

  address: {
    type: String,
    required: [true, 'Client phone is required!'],
  },
  country: {
    type: String,
    required: [true, 'Client email is required!'],
  },

  joinDate: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  
  projects: [
    {
      projectId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Projects',
      },
    },
  ],
});

export const Client = model('Client', ClientSchema);
