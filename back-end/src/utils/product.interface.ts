import { AccessoriesBrand, LapTopBrand, ProductCategory, SmartPhoneBrand, TabletBrand } from "../models/Product.model";

export interface IProductFillter {
    category: ProductCategory;
    brand: (SmartPhoneBrand | LapTopBrand | TabletBrand | AccessoriesBrand) [];
    sortProduct: string;

}

