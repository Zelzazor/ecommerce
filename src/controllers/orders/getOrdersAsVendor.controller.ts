import {IRequest} from "../../types/IRequest";
import {Response} from "express";
import { Orders } from "../../database/entities/Orders";
import paginate from "express-paginate";

export const getOrdersAsVendor = async (req: IRequest, res: Response) => {

    const [ordersAsVendor, count] = await Orders.findAndCount({
        where: {vendor: {uuid: req.user!.uuid}}, 
        relations: ['client', 'submit'],
        take: Number(req.query.limit), 
        skip: Number(req.skip),
        order: {orderDate: "DESC"}
    });

    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }   

    const itemCount = count;
    const pageCount = Math.ceil(itemCount / Number(req.query.limit));
    const page = Number(req.query.page);

    return res.render('orders/vendor', {
        user: req.user,
        title: 'Orders', 
        ordersAsVendor,
        pageCount, 
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, Number(req.query.page)),
        currentPage: page,
        cartLength
    });

  
}