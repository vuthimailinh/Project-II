import { Response, Request } from "express";
import {
    ErrorResponse,
    ErrorResponseType,
    InvalidInput,
    MissingParameter,
} from "../utils/errorResponse";
import { config } from "dotenv";
import { IProductFillter } from "../utils/product.interface";
import productService from "../services/product.service";
config();

class Product{
    async get_info(
        req: Request<any, any, IProductFillter>,
        res: Response
    ) {
        try {
            const {category, brand = [], sortProduct} = req.body;
            const product = await productService.getInfo(category, brand, sortProduct);
            return res.status(200).json(product);
            
        } catch (error:any) {
            console.log(error);
            const Err = new ErrorResponse(
                error.message as string,
                error.statusCode as number
            );
            return res.status(Err.statusCode).json({message:Err.message});
        }
    }

    async add_product (
        req: Request<any, any>,
        res: Response
    ) {

    }

}

const product = new Product();
export default product;