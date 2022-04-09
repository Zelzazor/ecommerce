import { Response, NextFunction } from "express";
import { User } from "../../database/entities/User";
import { IRequest } from "../../types/IRequest";

export const isLoggedIn = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (req.session.userUuid) {
        // check if user is logged in
        
        const user = await User.findOne({ where: { uuid: req.session.userUuid } });
        if (user) {
            req.user = user;
            return next();
        } else {
            return res.redirect("/auth/login");
        }
    } else {
      return res.redirect("/auth/login");
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// export custom middleware
