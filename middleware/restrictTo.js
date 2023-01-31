import AppError from '../utils/appError.js';

// restrict by role - authorization
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }

    next();
  };
};

// export const restrictTo = ({
//   route = 'holiday',
//   permissionKey = 'read'
// }) => {
//   return (req, res, next) => {

//     if (!user.permissions[route]?.[permissionKey]) {
//       return next(new AppError('You do not have permission to perform this action.', 403));
//     }

//     next();
//   };
// };

// holiday, attendance

// create, read, update, delete

// const permissions = {
//   holiday: {
//     read: true,
//     write: false,
//     update: true
//   },
//   leaves: {
//     read: true,
//     write: false,
//     update: true
//   }
// }
