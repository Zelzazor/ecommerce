import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";
import { User } from "../../database/entities/User";


export const addToCart = async (req: IRequest, res: Response) => {

    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }

    if(req.session.userUuid) {
        const user = await User.findOne({ where: { uuid: req.session.userUuid } })
        if(user) req.user = user
    }

    const { uuid } = req.params
    const submittings = await Submittings.findOne({where: {uuid: uuid}, relations: ['users']});

    try {
      if(submittings!.stock === 0) {
        throw new Error('Product out of stock')
        
      }
      if(req.user){
        if(req.user.uuid === submittings!.users.uuid){
            throw new Error('You can not add your own product to cart')
        }
      }
      
    } 
    catch (error: any) {
      error.status = 400
      return res.render('error', {user: req.user, title: error.message,message: error.message, cartLength, error})
    }

    
    if(!req.cookies.cart) {
        const cart = [submittings]
        res.cookie('cart', JSON.stringify(cart), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)})
    }
    else{
        let cart = JSON.parse(req.cookies.cart)

        try{
          if(cart.find((item:any) => item.uuid === uuid))
            throw new Error('Product already in cart')
        }
        catch(error: any) {
          error.status = 400
          return res.render('error', {
            user: req.user,
            title: 'Product already in cart',
            message: 'Product already in cart', 
            cartLength, 
            error
          })
        }

        


        cart.push(submittings)

        res.cookie('cart', JSON.stringify(cart), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)})
    }
    
    return res.render('product/add', {user: req.user, title: 'Product Added Successfully', cartLength: cartLength + 1});
}