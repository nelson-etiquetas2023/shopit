// Create and send token ans save in the cookie.

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken(); //Create Jwt token.

  // options for cookie.
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
  };

  res.cookie("token", token, options);

  console.log(token);

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
