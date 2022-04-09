import { IRequest } from "../../types/IRequest";
import { Response } from "express";

export const userSettings = (req: IRequest, res: Response) => {
    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }
    return res.render('settings/userSettings', {user: req.user, title: 'User Settings', cartLength});
}