import "express"
import { Request } from "express";
import { User } from "../database/entities/User";
declare module "express" {
    interface Request {
        user?: User;
    }
}