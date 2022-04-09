import { IRequest } from "../../types/IRequest";
import { Response } from "express";

export const userSettings = (req: IRequest, res: Response) => {
    return res.render('settings/userSettings', {user: req.user, title: 'User Settings'});
}