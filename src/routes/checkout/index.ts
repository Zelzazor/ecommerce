import express from 'express'
import { isLoggedIn } from '../../middlewares/auth/isLoggedin.middleware';
import { checkoutView, checkout } from '../../controllers/checkout';

const checkoutRoutes = express.Router()

checkoutRoutes.get('/', isLoggedIn, checkoutView)
checkoutRoutes.post('/', isLoggedIn, checkout)


export default checkoutRoutes;