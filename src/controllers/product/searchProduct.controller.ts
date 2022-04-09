import { IRequest } from "../../types/IRequest"
import { Response } from "express"
import { Submittings } from "../../database/entities/Submittings";
import { Category } from "../../database/entities/Category";
import { Raw } from "typeorm";
import { User } from "../../database/entities/User";
import paginate from "express-paginate";

export const searchProducts = async (req: IRequest, res: Response) => {
    const { query } = req
    const { c, q } = query
    const categoryName = c as string
    const queryString = q as string
    
    if(req.session.userUuid) {
        const user = await User.findOne({ where: { uuid: req.session.userUuid } })
        if(user) req.user = user
    }
    const [submittings, count] = await Submittings.findAndCount({
        relations: ['imagesSubmittings', 'category', 'users'], 
        take: Number(req.query.limit), 
        skip: Number(req.skip),
        order:{ id: "DESC"},
        where: {
            category: {
                ...(categoryName) && {name: categoryName}
            },
            ...(queryString) && { title: Raw(alias=>`LOWER(${alias}) LIKE '%${queryString.toLowerCase()}%'`) }
        }
    });
    const itemCount = count;
    const pageCount = Math.ceil(itemCount / Number(req.query.limit));
    const page = Number(req.query.page);
    
    const categories = await Category.find();
    return res.render('product/search', {
        user: req.user, 
        title: 'Search Products', 
        submittings, 
        categories, 
        pageCount, 
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, Number(req.query.page)),
        q: queryString,
        c: categoryName,
        currentPage: page,
    });
}