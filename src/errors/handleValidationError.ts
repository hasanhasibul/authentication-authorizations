import mongoose from 'mongoose'

export const handleValidationError = (
  errors: mongoose.Error.ValidationError,
) => {
  if (errors.name === 'ValidationError') {
    const allErrors = Object.values(errors.errors).map(
      (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: error?.path,
          message: error?.message,
        }
      },
    )
    const statusCode = 400
    return {
      statusCode,
      message: 'Validation Error',
      errorMessages: allErrors,
    }
  }
}
