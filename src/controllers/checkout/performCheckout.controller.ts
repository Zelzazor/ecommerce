import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Orders } from "../../database/entities/Orders";
import { Submittings } from "../../database/entities/Submittings";
import { AppDataSource } from '../../database'



export const checkout = async (req: IRequest, res: Response) => {

    const queryRunner = AppDataSource.createQueryRunner()
    
    let productId: any= req.body.productId;

        let cartLength = 0;
        if(req.cookies.cart){
            cartLength = JSON.parse(req.cookies.cart).length
            
        }

    if(typeof productId === 'string'){
        productId = [productId]
    }
    
    
    const products = productId.map((productID: string, index: number) => {
        return {
            productID: productID,
            quantity: Number(req.body.stockAcquired[index])
        }
    })

    await queryRunner.startTransaction()

    try {
    
    for(let i = 0; i < products.length; i++) {
        const submitting = await Submittings.findOne({where: {uuid: products[i].productID}, relations: ['users']});
        const order = Orders.create();
        order.submit = submitting!;
        order.unitPrice = submitting!.unitPrice;
        order.stockAcquired = Number(products[i].quantity);
        order.client = req.user!;
        order.vendor = submitting!.users;


        if(submitting!.stock === 0){
            throw new Error('Product out of stock');
        }

        if(order.stockAcquired > submitting!.stock){
            throw new Error('Cannot buy product more than stock');
        }
        if(submitting!.users.uuid === req.user!.uuid){
            throw new Error('Cannot buy your own product');
        }
        
        submitting!.stock = submitting!.stock - order.stockAcquired;
        await queryRunner.manager.save(submitting);
        await queryRunner.manager.save(order);
    }
    
    
    await queryRunner.commitTransaction()
    res.clearCookie('cart');

    return res.redirect('/orders/client');

    

} catch (error:any) {
    await queryRunner.rollbackTransaction()
    error.status = 400;
    res.render('error', {error: error, title: error.message, message: error.message, cartLength});
}




    
}