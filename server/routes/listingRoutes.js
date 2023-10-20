import express from 'express'
import { addListing, deleteListing, editListing, getAllListings, getListingById } from '../controllers/listingsController.js'
import { uploadFile } from '../middlewares/multerMiddleware.js'
import verifyUserAuth from '../utils/verifyAuth.js'

const router = express.Router()

router.get('/', getAllListings)
router.get('/:id', getListingById)
router.post('/', verifyUserAuth, uploadFile, addListing)
router.put('/:id',verifyUserAuth, uploadFile, editListing)
router.delete('/:id', verifyUserAuth, deleteListing)

export default router