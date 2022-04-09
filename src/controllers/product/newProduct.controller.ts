import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Category } from "../../database/entities/Category";

export const newProduct = async (req: IRequest, res: Response) => {
    const categories = await Category.find();
    return res.render('product/new', {user: req.user, title: 'New Product', categories});
}