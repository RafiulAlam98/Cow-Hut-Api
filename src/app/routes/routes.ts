import express from 'express'
import { CowRoutes } from '../modules/Cow/cow.routes'
import { SellerRoutes } from '../modules/Seller/seller.routes'
import { UserRoutes } from '../modules/User/user.routes'
import { BuyerRoutes } from './../modules/Buyer/buyer.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes.router,
  },
  {
    path: '/users',
    route: UserRoutes.router,
  },
  {
    path: '/cows',
    route: CowRoutes.router,
  },
  {
    path: '/seller',
    route: SellerRoutes.router,
  },
  {
    path: '/buyer',
    route: BuyerRoutes.router,
  },
  {
    path: '/order',
    route: UserRoutes.router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
