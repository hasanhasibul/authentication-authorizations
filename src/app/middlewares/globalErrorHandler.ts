import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { handleValidationError } from '../../errors/handleValidationError'
import { commoErrorResponseInterface } from '../../interfaces/common'
import handleZodError from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'
import ApiError from '../../errors/ApiError'
import config from '../../config'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number | undefined = 500
  let message: string | undefined = 'Something went wrong !'
  let errorMessages: commoErrorResponseInterface[] | undefined = []
  if (error?.name === 'ValidationError') {
    const simplifyError = handleValidationError(error)
    statusCode = simplifyError?.statusCode
    message = simplifyError?.message
    errorMessages = simplifyError?.errorMessages
  } else if (error.name === 'ZodError') {
    const simplifyZodError = handleZodError(error)
    statusCode = simplifyZodError?.statusCode
    message = simplifyZodError?.message
    errorMessages = simplifyZodError?.errorMessages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.send({
    statusCode,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
