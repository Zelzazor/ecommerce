import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";
import { User } from "../../database/entities/User";


export const getCart = async (req: IRequest, res: Response) => {
    let cart: Submittings[];

    if(req.session.userUuid) {
        const user = await User.findOne({ where: { uuid: req.session.userUuid } })
        if(user) req.user = user
    }

    if(!req.cookies.cart) {
        cart = []
    }
    else{
        cart = JSON.parse(req.cookies.cart)
    }
    
    return res.render('cart/index', {user: req.user, title: 'Cart', cart});
}