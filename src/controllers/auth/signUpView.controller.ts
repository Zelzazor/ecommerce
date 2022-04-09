import {Request, Response} from "express";

export const signUpView = (req: Request, res: Response) => {
    if(!req.session.userUuid)
        res.render('auth/register', { title: 'Sign Up' });
    else
        res.redirect('/');
}