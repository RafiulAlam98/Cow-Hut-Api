import mongoose from 'mongoose'

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors = [
    {
      path: err.path,
      message: 'Invalid Id',
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage: errors,
  }
}
