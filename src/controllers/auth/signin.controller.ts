import "dotenv/config"
import { User } from "../../database/entities/User"
import bcrypt from "bcryptjs"
import { Response, Request } from "express";


export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: {email: email }});
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(password, user.passwordHash);
            if (result) {
                // sign token and send it in response
                req.session.userUuid = user.uuid;
                return res.redirect("/");
            } else {
                return res.status(400).json({ error: "password doesn't match" });
            }
        }
        return res.status(400).json({ error: "user not found" });
    }
    catch (error: any) {
        console.log("error: ", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
  