import {Request, Response} from "express";

export const signInView = (req: Request, res: Response) => {
    if(!req.session.userUuid)
        res.render('auth/login', { title: 'Sign In' });
    else
        res.redirect('/');
}