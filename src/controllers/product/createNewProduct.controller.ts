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
    newImageSubmitting.imageUrl = req.file!.path;
    newProduct.title = name;
    newProduct.description = description;
    newProduct.unitPrice = price;
    newProduct.category = category!;
    newProduct.stock = stock;
    newProduct.users = req.user!;

    newProduct.imagesSubmittings;
    const createdProduct = await newProduct.save();
    newImageSubmitting.submittings = createdProduct;
    newImageSubmitting.save();
    console.log(category);
    return res.redirect('/');
}