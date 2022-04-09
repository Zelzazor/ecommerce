import {Request, Response} from "express";

export const signOut = (req: Request, res: Response) => {
    if(req.session.userUuid){
        req.session.destroy(err => {
            if(err)
                res.status(500).json({ error: err });
            else
                res.redirect('/');
        });
    }
    else{
        res.redirect('/auth/login');
    }
}