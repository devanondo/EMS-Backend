import AppError from '../utils/appError.js';

export const permissionTo = (route, permissionKey) => {
  return (req, res, next) => {
    if (!req.user.permissions[route]?.[permissionKey]) {
      return next(new AppError('Access Denied!', 403));
    }

    next();
  };
};
