import { BuyerController } from './buyer.controller'
import express from 'express'

const router = express.Router()

router.get('/:id', BuyerController.getSingleBuyer)
router.delete('/:id', BuyerController.deleteBuyer)
router.patch('/:id', BuyerController.updateBuyer)
router.get('/', BuyerController.getAllBuyers)

export const BuyerRoutes = { router }
