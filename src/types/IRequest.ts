import { Request } from "express";
import { User } from "../database/entities/User";

export interface IRequest extends Request {
    user?: User;
}