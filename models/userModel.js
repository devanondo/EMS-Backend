import jwt from 'jsonwebtoken';
import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      default: 'employee',
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      default: null,
    },
    secondaryPhone: {
      type: String,
      unique: true,
      default: null,
    },
    designation: {
      type: String,
      default: 'staff',
    },
    department: {
      type: String,
    },
    idno: {
      type: String,
      unique: true,
    },

    address: [
      {
        address1: {
          type: String,
        },
      },
    ],
    education: [
      {
        type: {
          type: String,
        },
        name: {
          type: String,
        },
        department: {
          type: String,
        },
        result: {
          type: String,
        },
        from: {
          type: String,
        },
        to: {
          type: String,
        },

        outof: {
          type: String,
          default: '5',
        },
      },
    ],
    avatar: {
      public_id: String,
      url: {
        type: String,
        default: 'https://i.ibb.co/3CY8BNT/profile1.png',
      },
    },

    // Leave
    leave: [],

    project: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Leave',
        },
      },
    ],

    //Attendance
    attendance: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Attendance',
        },
      },
    ],

    // Personal Info
    birth: {
      type: String,
    },
    gender: {
      type: String,
    },
    nid: {
      type: String,
      unique: true,
    },
    religion: {
      type: String,
    },
    materialstatus: {
      type: String,
    },

    // Emergency Contact
    emergency: {
      ename: {
        type: String,
      },
      enid: {
        type: String,
      },
      erelationships: {
        type: String,
      },
      ephone: {
        type: String,
      },
      ematerialstatus: {
        type: String,
      },
    },

    salary: {
      type: String,
    },
    joindate: {
      type: String,
    },
    type: String,
    permissions: {
      type: Object,
      default: {
        holiday: {
          read: true,
          write: false,
          update: false,
          delete: false,
        },
        leaves: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
        attendance: {
          read: true,
          write: true,
          update: false,
          delete: false,
        },
        employee: {
          read: true,
          write: false,
          update: false,
          delete: false,
        },
        project: {
          read: true,
          write: false,
          update: false,
          delete: false,
        },
        client: {
          read: false,
          write: false,
          update: false,
          delete: false,
        },
        configuration: {
          read: true,
          write: false,
          update: false,
          delete: false,
        },
      },
    },
  },
  { timestamps: true }
);

// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const User = model('User', UserSchema);
