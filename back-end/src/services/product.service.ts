import { compare, compareSync, genSaltSync, hash, hashSync } from "bcrypt";
import { ErrorResponse, InvalidInput } from "../utils/errorResponse";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import TokenModel from "../models/Token.model";
import RefreshTokenModel from "../models/Token.model";
import product from "../controller/Product.control";
import ProductModel from "../models/Product.model";
import { number } from "zod";

config();
class ProductService {
  async getInfo(category: string, brand: string[], sortProduct: string) {
    let products;
    let filter: {
      category: string;
      brand?: { $in: string[] };
      sortProduct?: string;
    } = {
      category: category,
    };
    if (brand && brand.length > 0) {
      filter.brand = { $in: brand };
    }

    products = await ProductModel.find(filter);

    if (sortProduct === "asc" || sortProduct === "desc") {
      const sortNumber = sortProduct === "asc" ? 1 : -1;
      products.sort((a, b) => sortNumber * (a.price - b.price));
    }

    return products;
  }
}
const productService = new ProductService();
export default productService;
