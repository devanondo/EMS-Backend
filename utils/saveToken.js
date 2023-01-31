// Creating Token saving in cookie

export const saveToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({

    status: 'success',
    data: user,
    token,
  });
};
