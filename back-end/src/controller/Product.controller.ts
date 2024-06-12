import productServices from '../services/Product.services';
import jwt from 'jsonwebtoken';

import { Response, Request } from 'express';
import { ErrorResponse, ErrorResponseType, InvalidInput, MissingParameter } from '../utils/errorResponse';
import auhtService from '../services/auth.service';
import Logger from '../lib/logger';
import { IFailRes, ISignIn, ISignUp, ISuccessRes, ITokenWithRole } from '../utils/auth.interface';
import ProductModel, { IProduct, IViewProduct } from '../models/Product.model';
import { config } from 'dotenv';
import { authenticateRole } from '../middlerware/role.authentication';
import { crossOriginResourcePolicy } from 'helmet';
import userServices from '../services/User.services';
import UserModel from '../models/User.model';
import ShoppingCartModel from '../models/ShoppingCart.model';
config();
class Product {
  async createProduct(req: any, res: Response<ISuccessRes | IFailRes>) {
    try {
      const { userId } = req.body;
      const result = await userServices.getUserById(userId);
      if (result?.role === 'admin' || result?.role === 'staff') {
        const { name, brand, discount, version, price, category, images, items } = req.body;
        if (!name || !brand || !price || !category || !images) {
          throw new MissingParameter();
        }

        const product = await productServices.createProduct(
          name,
          brand,
          discount,
          version,
          price,
          category,
          images,
          items,
        );

        return res.status(200).json({
          message: 'Create successfully',
        });
      } else {
        return res.status(403).json({
          message: 'Access denied',
        });
      }
    } catch (error: any) {
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }
  async deleteProduct(req: Request, res: Response<ISuccessRes | IFailRes>) {
    try {
      const { userId } = req.body;
      const result = await userServices.getUserById(userId);
      if (result?.role === 'admin' || result?.role === 'staff') {
        const { _id } = req.body;
        const product = productServices.deleteProduct(_id);
        return res.status(200).json({
          message: 'Delete successfully',
        });
      } else {
        return res.status(403).json({
          message: 'Access denied',
        });
      }
    } catch (error: any) {
      // Logger.error(error);
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }
  async updateProduct(req: Request, res: Response<ISuccessRes | IFailRes>) {
    try {
      const { userId } = req.body;
      const result = await userServices.getUserById(userId);
      if (result?.role === 'admin' || result?.role === 'staff') {
        const { _id, name, brand, discount, version, price, category, images, items } = req.body;

        if (!name || !brand || !price || !category || !images) {
          throw new MissingParameter();
        }

        const product = await productServices.updateProduct({
          _id,
          name,
          brand,
          discount,
          version,
          price,
          category,
          images,
          items,
        });

        return res.status(200).json({
          message: 'Update successfully',
        });
      } else {
        return res.status(403).json({
          message: 'Access denied',
        });
      }
    } catch (error: any) {
      // Logger.error(error);
      console.log(error);

      const Err = new ErrorResponse(error.message as string, error.statusCode as number);

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }

  async addToCart(userId: string, productId: string, quantity: number) {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    let cart = await ShoppingCartModel.findOne({ user_id: userId });
    if (!cart) {
      cart = new ShoppingCartModel({
        user_id: userId,
        cartProduct: [
          {
            product_id: productId,
            quantity: quantity,
          },
        ],
      });
    } else {
      const productIndex = cart.cartProduct.findIndex((item) => item.product_id === productId);
      if (productIndex >= 0) {
        cart.cartProduct[productIndex].quantity += quantity;
      } else {
        cart.cartProduct.push({
          product_id: productId,
          quantity: quantity,
          name: '',
          image: '',
          version: [""]
        });
      }
    }
    await cart.save();
    return {
      success: true,
      message: 'Product added to cart',
    };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return {
      success: false,
      message: 'Failed to add product to cart',
    };
  }
}
  async viewProduct(req: Request<any, any, IViewProduct>, res: Response) {
  try {
    const { brand, price, category } = req.body;
    console.log(123);

    const product = await productServices.viewProduct(brand, price, category);
    return res.status(200).json({ message: 'successfull', data: product });
  } catch (error: any) {
    // Logger.error(error);
    console.log(error);

    return res.status(error.statusCode).json({ message: error.message });
  }
}
  async viewDetailProduct(req: Request, res: Response) {
  try {
    const { _id } = req.body;

    const product = await productServices.viewDetailProduct(_id);

    return res.status(200).json(product);
  } catch (error: any) {
    // Logger.error(error);
    console.log(error);

    const Err = new ErrorResponse(
      error.message as string,
      error.statusCode as number
    );

    return res.status(Err.statusCode).json({ message: Err.message });
  }
}
}

const product = new Product();
export default product;
