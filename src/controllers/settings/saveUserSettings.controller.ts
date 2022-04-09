import { IRequest } from "../../types/IRequest"
import { Response } from "express"

export const saveUserSettings = async (req: IRequest, res: Response) => {
    const { user } = req;
    const { email, firstName, lastName } = req.body;
    user!.email = email;
    user!.firstName = firstName;
    user!.lastName = lastName;
    await user!.save();
    return res.redirect("/settings/user");
}