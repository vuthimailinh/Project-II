import mongoose, { Schema, Document, Types } from 'mongoose';

export enum ProductCategory {
    SmartPhone = 'Smart Phone',
    Laptop = 'Laptop',
    Tablet = 'Tablet',
    SmartWatch = 'Smart Watch',
    Accessories = 'Accessories',
    Earphone = 'Earphone',
    Backpack = 'Backpack',
    Mouse = 'Mouse',
    Keyboard = 'Keyboard',
}

export enum SmartPhoneBrand {
    Apple = 'Apple',
    Samsung = 'Samsung',
    Huawei = 'Huawei',
    Oppo = 'Oppo',
    Xiaomi = 'Xiaomi',
    Nokia = 'Nokia',
}

export enum LapTopBrand {
    Asus = 'Asus',
    Dell = 'Dell',
    MacBook = 'MacBook',
    Acer = 'Acer',
    Hp = 'Hp',
    Msi = 'Msi',
}

export enum TabletBrand {
    Apple = 'IPad',
    Samsung = 'Samsung',
    Huawei = 'Huawei',
    Oppo = 'Oppo',
    Xiaomi = 'Xiaomi',
    Nokia = 'Nokia',
}

export enum AccessoriesBrand {
    Apple = 'Apple',
    Samsung = 'Samsung',
    Huawei = 'Huawei',
    Oppo = 'Oppo',
    Xiaomi = 'Xiaomi',
    Nokia = 'Nokia',
}

export interface IViewProduct extends Document {
    brand: SmartPhoneBrand | TabletBrand | LapTopBrand | AccessoriesBrand;
    category: ProductCategory;
    price: number;
}

export interface IProduct extends Document {
    _id: string | Types.ObjectId;
    name: string;
    discount: number;
    price: number;
    brand: SmartPhoneBrand | TabletBrand | LapTopBrand | AccessoriesBrand;
    version: [any];
    category: ProductCategory;
    images: [string];
    items: [string];
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    discount: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    brand: {
        type: String,
        required: true,
        enum: Object.values({ ...SmartPhoneBrand, ...TabletBrand, ...LapTopBrand, ...AccessoriesBrand }),
    },
    version: { type: [Schema.Types.Mixed], default: [] },
    category: { type: String, required: true, enum: ProductCategory },
    images: { type: [String], required: false },
    items: { type: [String], required: true, ref: 'Product', default: '' },
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;
