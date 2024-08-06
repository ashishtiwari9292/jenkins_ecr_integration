export enum ResponseMessagesEnum {
  INVALID_TOKEN = 'Invalid token',
  SUCCESS = 'Success',
  FAILED = 'Failed',
  ACCESS_DENIED = 'You do not have access!',
  INVALID_USER = 'The user with this email does not exist!',
  EXIST_MAIL = 'This email is already exists!',
  PASSWORD_OR_EMAIL_NOT_VALID = 'The email or password is incorrect.',
  NOT_FOUND = 'Not found',
  INVALID_CATEGORY = 'Invalid category',
  DUPLICATE_TITLE = 'Blog with this title is already exist!',
  INVALID_OLD_PASSWORD = 'Old password is incorrect',
  ADMIN_DELETE = 'You are try to delete admin user!',
  DUPLICATE_TOPIC = 'This topic is already exist!',
  EMAIL_EXISTED = 'The user with this mail is already exist!',
  INVALID_VIDEO_FORMAT = 'Invalid video format!',
  EXIST_AUTHOR = 'This author with this name is already exist!',
  NO_USER_EXISTS = 'No user exists!',
  INVALID_OTP = 'Invalid Otp',
  REQUEST_RESET_CODE = 'Reset password code has been sent on your registered mail account',
  CODE_EXPIRED = 'Code has been expired',
}

export enum ResponseCodeEnum {
  NO_USER_EXISTS = 404,
}
