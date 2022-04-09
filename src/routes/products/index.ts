import express from 'express'
import { isLoggedIn } from '../../middlewares/auth/isLoggedin.middleware';
import { newProduct, createNewProduct, searchProducts, addToCart, removeFromCart  } from '../../controllers/product';

import paginate from 'express-paginate';


import { upload } from '../../middlewares/files/fileUpload.middleware';
const ProductRoutes = express.Router()

ProductRoutes.get('/new', isLoggedIn, newProduct)
ProductRoutes.post('/new', [isLoggedIn, upload.single('image')], createNewProduct)
ProductRoutes.get('/search', paginate.middleware(10,50), searchProducts)
ProductRoutes.post('/:uuid/add', addToCart)
ProductRoutes.post('/:uuid/remove', removeFromCart)






export default ProductRoutes