import cors from 'cors'
import express, { Application } from 'express'
import routes from './app/routes/routes'

export const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //   throw new ApiError(400, 'Error is beautiful', '')
//   res.send('server running')
// })

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'Not Found',
//     errorMessage: [
//       {
//         path: req.originalUrl,
//         message: 'Api Not Found',
//       },
//     ],
//     stack: '',
//   })
//   next()
// })
