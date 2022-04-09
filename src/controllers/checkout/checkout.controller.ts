import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";


export const checkoutView = async (req: IRequest, res: Response) => {
        let cart: Submittings[] = []
        let cartLength = 0;
        if(req.cookies.cart){
            cart = JSON.parse(req.cookies.cart)
            cartLength = cart.length
        }

        if(cartLength === 0) {
            return res.redirect("/cart")
        }

        return res.render('checkout/index', {user: req.user, title: 'Checkout', cartLength, cart});
}