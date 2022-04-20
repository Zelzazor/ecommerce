import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Category } from "../../database/entities/Category";
import { Submittings } from "../../database/entities/Submittings";
import { ImagesSubmitting } from "../../database/entities/ImagesSubmitting";

export const createNewProduct = async (req: IRequest, res: Response) => {
    const { name, description, price, stock} = req.body;
    const category = await Category.findOne({where: {uuid: req.body.category}});
    const newProduct = Submittings.create();
    const newImageSubmitting = ImagesSubmitting.create();
    if(req.file!.path) {
        newImageSubmitting.imageUrl = '/'+req.file!.path;
    }
    else {
        //@ts-ignore
        newImageSubmitting.imageUrl = req.file!.location;
    }
    newProduct.title = name;
    newProduct.description = description;
    newProduct.unitPrice = price;
    newProduct.category = category!;
    newProduct.stock = stock;
    newProduct.users = req.user!;
    
    const createdProduct = await newProduct.save();
    newImageSubmitting.submittings = createdProduct;
    newImageSubmitting.save();
    return res.redirect('/');
}