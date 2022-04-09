import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";


export const removeFromCart = async (req: IRequest, res: Response) => {

    const { uuid } = req.params
    let cart: Submittings[]; 
    if(!req.cookies.cart) {
        cart = []
    }
    else{
        cart = JSON.parse(req.cookies.cart).filter((item:any) => item.uuid !== uuid)
        res.cookie('cart', JSON.stringify(cart), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)})
    }
    
    return res.redirect('/cart');
}