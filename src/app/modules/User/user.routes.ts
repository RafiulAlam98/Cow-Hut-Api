import { UserController } from './user.controller'
import express from 'express'

const router = express.Router()

router.post('/seller', UserController.createSeller)
router.post('/buyer', UserController.createbuyer)
router.post('/addOrder', UserController.CreateOrderCow)
router.get('/allOrder', UserController.getAllOrders)
router.get('/:id', UserController.getSingleUser)
router.patch('/:id', UserController.updateSingleUser)
router.delete('/:id', UserController.deleteSingleUser)
router.get('/', UserController.getAllUsers)

export const UserRoutes = {
  router,
}
