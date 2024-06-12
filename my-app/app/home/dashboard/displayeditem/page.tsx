'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import image from '../../../Images/asus-vivobook.jpg';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLast, Router } from 'lucide-react';
import Link from 'next/link';
import { phoneData } from '../sample-data';
import { useRouter } from 'next/navigation';
import tag from '../../../../Images/tag3.png';
import { useEffect, useState } from 'react';
import DetailProduct from '@/components/Detail.Product';
import { formatNumberWithDots } from '@/lib/utils';

type ProductInfo = {
    _id: string;
    name: string;
    discount: number;
    price: number;
    brand: string;
    version: any[];
    category: string;
    images: string[];
    items: string[];
};
export default function DisplayedItem({
    brand,
    category,
    price,
    reverse,
}: {
    brand?: string;
    category: string;
    price?: number;
    reverse?: string;
}) {
    const [listProduct, setListProduct] = useState<ProductInfo[] | null>([]);

    const router = useRouter();
    let categoyy: string = '';
    switch (category) {
        case 'Điện thoại':
            categoyy = 'Smart Phone';
            break;
        case 'Máy tính':
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
    const brandd = brand || '';
    let pricey = -1;
    if (price) pricey = price;
    if (price == 0) pricey = 0;

    const getProduct = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/product/view-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: categoyy,
                    brand: brandd,
                    price: pricey,
                }),
            });
            const result = await response.json();
            setListProduct(result.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getProduct();
    }, [brand, price]);

    const handleViewMore = () => {
        if (reverse === 'true') {
            const url = `/home/view-category-brand`;
            if (category) localStorage.setItem('category', category);
            if (brand) localStorage.setItem('brand', brand);
            localStorage.setItem('reverse', reverse);
            router.push(url);
        } else {
            if (!brand) {
                switch (category) {
                    case 'Điện thoại':
                        router.push('/home/view-smartphone');
                        break;
                    case 'Máy tính':
                        router.push('/home/view-laptop');
                        break;
                    case 'Đồng hồ':
                        router.push('/home/view-watch');
                        break;
                    case 'Tablet':
                        router.push('/home/view-tablet');
                        break;
                    case 'Phụ kiện':
                        router.push('/home/view-accessory');
                        break;
                }
                localStorage.setItem('category', category);
            } else {
                const url = `/home/view-category-brand`;
                localStorage.setItem('category', category);
                localStorage.setItem('brand', brand);
                router.push(url);
            }
        }
    };
    if (listProduct?.length === 0) return null;
    return (
        <div className="lg:w-3/4 max-w-sm lg:max-w-full  m-y-2 m-0 md:my-4">
            <div className=" flex justify-between items-center">
                <Label className="font-bold md:text-xl text-base">
                    {reverse === 'true' ? category : brand || category}
                </Label>
                <Button onClick={handleViewMore}>
                    Xem thêm
                    <ChevronLast />
                </Button>
            </div>
            <Carousel className="">
                <CarouselContent className="-ml-1 ">
                    {listProduct?.length !== 0 ? (
                        listProduct?.map((product, index) => (
                            <CarouselItem key={index} className="pl-1  basis-1/3 lg:basis-1/5 ">
                                <div className="p-[3px] md:p-1  ">
                                    <Card className="">
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
                                        <CardContent className="md:pt-4 h-[290px] shadow-md p-[12px]  flex flex-col md:space-y-2 space-y-1">
                                            <div className="w-auto z-0 flex justify-center h-[107px]">
                                                <img
                                                    src={product.images[0]}
                                                    className="object-cover h-full hover:scale-110 transition duration-500"
                                                    alt="asus"
                                                />
                                            </div>

                                            <CardTitle
                                                className="text-[18px]"
                                                style={{
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {product.name}
                                            </CardTitle>
                                            <p className="text-[16px] relative">
                                                {formatNumberWithDots(product.price)}
                                                <span className="underline md:text-xs text-[8px] inline-block align-top">
                                                    đ
                                                </span>
                                            </p>

                                            <div className="">
                                                <DetailProduct
                                                    product={{
                                                        _id: product._id,
                                                        name: product.name,
                                                        discount: product.discount,
                                                        price: product.price,
                                                        brand: product.brand,
                                                        category: product.category,
                                                        versions: product?.version.map((item) => {
                                                            return { color: item?.color };
                                                        }),

                                                        images: product.images,
                                                    }}
                                                ></DetailProduct>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <div></div>
                    )}
                </CarouselContent>
                <CarouselPrevious className=" border-none" />
                <CarouselNext className=" border-none" />
            </Carousel>
        </div>
    );
}
