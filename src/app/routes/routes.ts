import express from 'express'
import { CowRoutes } from '../modules/Cow/cow.routes'
import { UserRoutes } from '../modules/User/user.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes.router,
  },
  {
    path: '/cows',
    route: CowRoutes.router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
