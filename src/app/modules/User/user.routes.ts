import { UserController } from './user.controller'
import express from 'express'

const router = express.Router()

router.post('/seller', UserController.createSeller)
router.get('/:id', UserController.getSingleUser)
router.patch('/:id', UserController.updateSingleUser)
router.delete('/:id', UserController.deleteSingleUser)
router.get('/', UserController.getAllUsers)

export const UserRoutes = {
  router
}
