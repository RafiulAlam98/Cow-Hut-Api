import { CowRoutes } from '../modules/Cow/cow.routes'
import { UserRoutes } from '../modules/User/user.routes'
import express from 'express'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth/signup',
    route: UserRoutes.router,
  },
  {
    path: '/cows',
    route: CowRoutes.router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
