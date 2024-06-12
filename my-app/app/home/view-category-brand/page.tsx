'use client';
import { MenubarDemo } from '../../home/dashboard/category/page';
import DisplayedItem from '../../home/dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../../home/dashboard/breadcrumb/page';
import { laptopData } from '../../home/dashboard/sample-data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import tag from '../../../Images/tag3.png';

type ProductInfo = {
    _id: string;
    name: string;
    discount: number;
    price: number;
    brand: string;
    version: string[];
    category: string;
    images: string[];
    items: string[];
};

export default function ViewCategoryBrand() {
    const [listProduct, setListProduct] = useState<ProductInfo[] | null>([]);
    const category = localStorage.getItem('category') || ' ';
    const brand = localStorage.getItem('brand') || ' ';
    const reverse = localStorage.getItem('reverse') || ' ';
    let categoyy: string = '';
    switch (category) {
        case 'Điện thoại':
            categoyy = 'Smart Phone';
            break;
        case 'Laptop':
            categoyy = 'Laptop';
            break;
        case 'Đồng hồ':
            categoyy = 'Smart Watch';
            break;
        case 'Tablet':
            categoyy = 'Tablet';
            break;
        case 'Phụ kiện':
            categoyy = 'Accessories';
            break;
    }

    let pricee = -1;
    // if (price) pricee = price;

    const getProduct = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/product/view-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: categoyy,
                    brand: brand,
                    price: pricee,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Success get produts', result.data);
            if (result.data.length !== 0) setListProduct(result.data);
        } catch (e) {
            console.log(e);
        }
    };
    if (listProduct?.length === 0) getProduct();

    console.log(listProduct);
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator reverse={reverse} category={category} brand={brand} />
            <div className="grid grid-cols-5 lg:w-3/4 max-w-sm lg:max-w-full my-6">
                {listProduct?.map((product, index) => (
                    <div key={index} className="p-[3px] md:p-1 ">
                        <Card>
                            {product.discount === 0 ? (
                                <div></div>
                            ) : (
                                <div className="absolute z-10 -ml-[30px] -mt-10 h-auto w-auto ">
                                    <img src={tag.src} width={120} className="transform scale-y-[-1]" />
                                    <p className=" absolute ml-8 -mt-[75px] text-white font-bold text-xs">
                                        Giảm {product.discount}%
                                    </p>
                                </div>
                            )}
                            <CardContent className="md:pt-4 h-[290px] p-[12px] flex flex-col relative md:space-y-2 space-y-1">
                                <div className="w-auto flex justify-center h-[107px]">
                                    <img src={product.images[0]} className="object-cover h-full" alt="asus" />
                                </div>

                                <CardTitle className="text-[18px]">{product.name}</CardTitle>
                                <p className="text-[16px] relative">
                                    {product.price}
                                    <span className="underline md:text-xs text-[8px] inline-block align-top">đ</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
