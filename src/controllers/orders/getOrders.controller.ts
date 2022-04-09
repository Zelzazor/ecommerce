import {IRequest} from "../../types/IRequest";
import {Response} from "express";

export const getOrders = async (req: IRequest, res: Response) => {

    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }   

    return res.render('orders/index', {user: req.user, title: 'Orders', cartLength});

  
}