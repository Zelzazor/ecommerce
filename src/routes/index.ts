import express from 'express'
import AuthRoutes from './auth';
import SettingRoutes from './settings';
import ProductRoutes from './products';
import CartRoutes from './cart';
import { User } from '../database/entities/User';
import { Submittings } from '../database/entities/Submittings';

const routes = express.Router()

routes.use('/auth', AuthRoutes)
routes.use('/settings', SettingRoutes)
routes.use('/product', ProductRoutes)
routes.use('/cart', CartRoutes)

routes.get('/', async (req, res) => {
    const submittings = await Submittings.find({
        relations: ['imagesSubmittings', 'category', 'users'], 
        take: 6, 
        order:{ id: "DESC"}
    });

    
    if(!req.session.userUuid){
        
        res.render('index', { title: 'Home', submittings})
    }else{
        User.findOne({ where: { uuid: req.session.userUuid } })
        .then(user => {
            res.render('index', { title: 'Home', user: user, submittings })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    }
    
})





export default routes;

