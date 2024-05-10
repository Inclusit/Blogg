export function registerUserErrorHandler(error, res) {
  let errors = {};

  if (error.message.includes("email: Path `email")) {
    errors.email("Email is invalid");
  }

  if (error.message.includes("'password: Path: `password`")) {
    errors.password(
      "Password is invalid, password has to contain at least one digit, one lowercase letter, one uppercase letter, one special character, and at least 8 characters long"
    );
  }

  if (error.message.includes("duplicate key error")) {
    errors.email("Email is already in use");
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  res.status(500).json({
    message: error.message,
  });
}

export function userWithoutPassword(user) {
  user = user.toObject();

  delete user.password;
  console.log(user);
  return user;
}
