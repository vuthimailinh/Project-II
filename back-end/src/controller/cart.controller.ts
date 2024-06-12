import { Request, Response } from 'express';
import { ErrorFromServer, ErrorResponse, MissingParameter } from '../utils/errorResponse';
import ShoppingCartModel, { IShoppingCart, IShoppingCartProduct } from '../models/ShoppingCart.model';
import { json } from 'body-parser';
import OrderModel, { IOrderProduct } from '../models/Order.model';

class CartController {
    async addToCart(req: Request<any, any, { userId: string; cartProduct: IShoppingCartProduct }>, res: Response) {
        try {
            const { userId, cartProduct } = req.body;
            if (!userId || !cartProduct) {
                throw new MissingParameter();
            }

            let userCart = await ShoppingCartModel.findOne({ user_id: userId });
            if (!userCart) {
                userCart = await ShoppingCartModel.create({ user_id: userId, cartProduct: [cartProduct] });
                return res.status(2003).json(userCart);
            }

            const productIndex = userCart.cartProduct.findIndex((p) => p.product_id === cartProduct.product_id);
            if (productIndex > -1) {
                // Update the quantity if product already exists in the cart
                userCart.cartProduct[productIndex].quantity = cartProduct.quantity;
            } else {
                // Add the product if it does not exist in the cart
                userCart.cartProduct.push(cartProduct);
            }

            await userCart.save();

            return res.status(200).json(userCart);
        } catch (error: any) {
            console.log(error);
            const err = new ErrorResponse(error.message, error.statusCode);

            return res.status(err.statusCode).json(err.message);
        }
    }

    async viewCart(req: Request<any, any, { userId: string }>, res: Response) {
        try {
            const { userId } = req.body;
            const cart = await ShoppingCartModel.findOne({ user_id: userId }).populate({
                path: 'cartProduct.product_id',
                model: 'Product',
            });

            console.log(cart);
            return res.status(200).json({ data: cart });
        } catch (error: any) {
            console.log(error);

            const err = new ErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json(err.message);
        }
    }

    async removeCart(req: Request<any, any, { userId: string; productId: string }>, res: Response) {
        try {
            const { userId, productId } = req.body;
            if (!userId || !productId) {
                throw new MissingParameter();
            }
    
            let userCart = await ShoppingCartModel.findOne({ user_id: userId });
            if (!userCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
    
            const productIndex = userCart.cartProduct.findIndex((p) => p.product_id === productId);
            if (productIndex > -1) {
                // Remove the product from the cart
                userCart.cartProduct.splice(productIndex, 1);
                await userCart.save();
                return res.status(200).json(userCart);
            } else {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
    
        } catch (error: any) {
            console.log(error);
            const err = new ErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json(err.message);
        }
    }

    async updateCart(req: Request<any, any, { userId: string; cartProduct: [IShoppingCartProduct] }>, res: Response) {
        try {
            const { userId, cartProduct } = req.body;
            console.log(userId, cartProduct);
            if (!userId || !cartProduct) {
                throw new MissingParameter();
            }
            console.log(cartProduct);

            const newCart = await ShoppingCartModel.findOne({ user_id: userId });

            if (!newCart) {
                throw new ErrorFromServer();
            }

            newCart.cartProduct = cartProduct;
            await newCart.save();

            return res.status(200).json({ data: newCart });
        } catch (error: any) {
            console.log(error);

            const err = new ErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json(err.message);
        }
    }

    async checkout(
        req: Request<
            any,
            any,
            {
                userId: string;
                totalprice: string;
                address: string;
                phoneNumber: string;
                orderProducts: IOrderProduct[];
            }
        >,
        res: Response,
    ) {
        try {
            const { userId, orderProducts, totalprice, address, phoneNumber } = req.body;

            if (!userId || !orderProducts || !(orderProducts.length >= 0)) {
                throw new MissingParameter();
            }

            const newOrder = await OrderModel.create({
                user_id: userId,
                totalprice: totalprice,
                address,
                phoneNumber,
            });

            newOrder.orderProduct = orderProducts;
            await newOrder.save();

            return res.status(200).json({ data: newOrder });
        } catch (error: any) {
            console.log(error);

            const err = new ErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json(err.message);
        }
    }
    async viewOrder(
        req: Request<
            any,
            any,
            {
                userId: string;
            }
        >,
        res: Response,
    ) {
        try {
            const { userId } = req.body;

            const order = await OrderModel.find({ user_id: userId }).populate({
                path: 'orderProduct.product_id',
                model: 'Product',
            });

            return res.status(200).json({ data: order });
        } catch (error: any) {
            console.log(error);

            const err = new ErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json(err.message);
        }
    }
}

const cartController = new CartController();
export default cartController;
