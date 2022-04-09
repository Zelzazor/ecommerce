import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";
import { User } from "../../database/entities/User";

export const productDetail = async (req: IRequest, res: Response) => {
    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }

    if(req.session.userUuid) {
        const user = await User.findOne({ where: { uuid: req.session.userUuid } })
        if(user) req.user = user
    }

    const submitting = await Submittings.findOne({ 
        where: { uuid: req.params.uuid },
        relations: ['imagesSubmittings', 'category', 'users'] 
    });

    submitting?.imagesSubmittings

    return res.render('product/detail', {user: req.user, title: submitting!.title, product: submitting, cartLength});

}