import express from 'express'
import {getCart} from '../../controllers/cart'
//import { isLoggedIn } from '../../middlewares/auth/isLoggedin.middleware'
const CartRoutes = express.Router()

CartRoutes.get('/', getCart)

export default CartRoutes