import { SellerController } from './seller.controller'
import express from 'express'

const router = express.Router()

router.get('/:id', SellerController.getSingleSeller)
router.delete('/:id', SellerController.deleteSeller)
router.patch('/:id', SellerController.updateSeller)
router.get('/', SellerController.getAllSellers)

export const SellerRoutes = {
  router,
}
