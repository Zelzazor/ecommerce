import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Category } from "../../database/entities/Category";

export const newProduct = async (req: IRequest, res: Response) => {
    let cartLength = 0;
        if(req.cookies.cart){
            cartLength = JSON.parse(req.cookies.cart).length
        }
    const categories = await Category.find();
    return res.render('product/new', {user: req.user, title: 'New Product', categories, cartLength});
}