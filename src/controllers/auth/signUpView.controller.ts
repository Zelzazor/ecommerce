import {Request, Response} from "express";

export const signUpView = (req: Request, res: Response) => {
    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }
    if(!req.session.userUuid)
        res.render('auth/register', { title: 'Sign Up', cartLength });
    else
        res.redirect('/');
}