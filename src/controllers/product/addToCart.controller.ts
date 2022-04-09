import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";


export const addToCart = async (req: IRequest, res: Response) => {

    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }

    const { uuid } = req.params
    const submittings = await Submittings.findOne({where: {uuid: uuid}});
    if(!req.cookies.cart) {
        const cart = [submittings]
        res.cookie('cart', JSON.stringify(cart), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)})
    }
    else{
        let cart = JSON.parse(req.cookies.cart)
        cart.push(submittings)

        cart = cart.reduce((acc:any, current:any) => {
            const x = acc.find((item:any) => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);



        res.cookie('cart', JSON.stringify(cart), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)})
    }
    
    return res.render('product/add', {user: req.user, title: 'Product Added Successfully', cartLength: cartLength + 1});
}