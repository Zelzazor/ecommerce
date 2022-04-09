import {Request, Response} from "express";

export const signInView = (req: Request, res: Response) => {
    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }
    if(!req.session.userUuid)
        res.render('auth/login', { title: 'Sign In', cartLength });
    else
        res.redirect('/');
}