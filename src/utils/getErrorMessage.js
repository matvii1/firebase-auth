import { AuthErrorCodes } from 'firebase/auth'

export function getErrorLoginMessage(code) {
  if (
    code === AuthErrorCodes.INVALID_PASSWORD ||
    code === AuthErrorCodes.USER_DELETED
  ) {
    return 'Invalid email or password'
  } else {
    return 'Could not log in'
  }
}

export function getErrorSignupMessage(code) {
  if (code === AuthErrorCodes.WEAK_PASSWORD) {
    return 'Password is too weak'
  }

  if (code === AuthErrorCodes.EMAIL_EXISTS) {
    return 'User with this email already exists'
  }

  return 'Could not create account'
}
