import express from 'express'
import AuthRoutes from './auth';
import SettingRoutes from './settings';
import ProductRoutes from './products';
import CartRoutes from './cart';
import CheckoutRoutes from './checkout';
import OrderRoutes from './orders';
import { User } from '../database/entities/User';
import { Submittings } from '../database/entities/Submittings';

const routes = express.Router()

routes.use('/auth', AuthRoutes)
routes.use('/settings', SettingRoutes)
routes.use('/product', ProductRoutes)
routes.use('/cart', CartRoutes)
routes.use('/checkout', CheckoutRoutes)
routes.use('/orders', OrderRoutes)

routes.get('/', async (req, res) => {
    const submittings = await Submittings.find({
        relations: ['imagesSubmittings', 'category', 'users'], 
        take: 6, 
        order:{ id: "DESC"}
    });
    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }
    
    if(!req.session.userUuid){
        
        res.render('index', { title: 'Home', submittings, cartLength})
    }else{
        User.findOne({ where: { uuid: req.session.userUuid } })
        .then(user => {
            res.render('index', { title: 'Home', user: user, submittings, cartLength })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    }
    
})





export default routes;

