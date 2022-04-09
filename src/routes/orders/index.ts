import express from 'express'
import {getOrders, getOrdersAsClient, getOrdersAsVendor} from '../../controllers/orders'
import { isLoggedIn } from '../../middlewares/auth/isLoggedin.middleware'
import paginate from 'express-paginate';
const OrderRoutes = express.Router()


OrderRoutes.get('/', isLoggedIn , getOrders)
OrderRoutes.get('/client', [isLoggedIn,paginate.middleware(10,50)] , getOrdersAsClient)
OrderRoutes.get('/vendor', [isLoggedIn,paginate.middleware(10,50)] , getOrdersAsVendor)





export default OrderRoutes