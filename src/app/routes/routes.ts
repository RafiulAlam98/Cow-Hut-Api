import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes.router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
