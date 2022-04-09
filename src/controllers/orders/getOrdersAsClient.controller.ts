import {IRequest} from "../../types/IRequest";
import {Response} from "express";
import { Orders } from "../../database/entities/Orders";
import paginate from "express-paginate";

export const getOrdersAsClient = async (req: IRequest, res: Response) => {

    const [ordersAsClient, count] = await Orders.findAndCount({
        where: {client: {uuid: req.user!.uuid}}, 
        relations: ['vendor', 'submit'],
        take: Number(req.query.limit), 
        skip: Number(req.skip),
        order: {orderDate: "DESC"}
    });

    const itemCount = count;
    const pageCount = Math.ceil(itemCount / Number(req.query.limit));
    const page = Number(req.query.page);

    let cartLength = 0;
    if(req.cookies.cart){
        cartLength = JSON.parse(req.cookies.cart).length
    }   

    



    
    return res.render('orders/client', {
        user: req.user, 
        title: 'Orders as Client', 
        ordersAsClient, 
        pageCount, 
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, Number(req.query.page)),
        currentPage: page,
        cartLength
    });

  
}