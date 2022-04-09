import "dotenv/config"
import { User } from "../../database/entities/User"
import bcrypt from "bcryptjs"
import { Response, Request } from "express";
import { Role } from "../../database/entities/Role";
import { manager } from "../../database/manager";




export const signUp = async (req: Request, res: Response) => {
    try {
        
        // hash the password
        const { email, password, firstName, lastName } = req.body
        const passwordHash = await bcrypt.hash(password, 10);
        const role = await Role.findOne({ where: { slug: "CLIENT" } })
        // create a new user
        const user = User.create({
            email,
            passwordHash,
            firstName,
            lastName,
            role: role!
        });

        // save the user
        await manager.save(user);

        req.session!.userUuid = user.uuid;
        
        // send new user as response
        res.redirect("/");
      } catch (error: any) {
        if(error.constraint === "EmailUnique"){
          error.status = 400;
          res.render("error", { message: "Email already exists", error });
        }
        else{
          error.status = 500;
          res.render("error", { message: "Something went wrong", error });
        }
          
      }
}