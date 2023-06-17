import mongoose from 'mongoose'
import { errorlogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
    logger.info('database connected')
  } catch (error) {
    errorlogger.error(error)
  }
}

main()
