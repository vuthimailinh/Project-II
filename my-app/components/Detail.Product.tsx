'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FC, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { BellRing, CircleDollarSign, Minus, Plus } from 'lucide-react';
import { api_cart } from '@/config/axios.config';
import { headers } from 'next/headers';
import axios from 'axios';
import Link from 'next/link';
interface IProduct {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    discount: number;
    versions?: {
        color: string;
    }[];
    images: string[];
}

const DetailProduct = ({ product }: { product: IProduct }): JSX.Element => {
    const [item, setItem] = useState<IProduct>(product);
    const [quantity, setQuantity] = useState<number>(1);

    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        const userStore = localStorage.getItem('user');
        if (userStore) {
            setUserId(JSON.parse(userStore));
        }
    }, []);

    const addToCart = (cartProduct: { product_id: string; quantity: number }) => {
        axios
            .create({
                baseURL: `${process.env.NEXT_PUBLIC_API_URL}/cart`, // Set your Express server's API base URL
                headers: {
                    'Content-Type': 'application/json', // Default content type
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
            })
            .post('/add-to-cart', {
                cartProduct: cartProduct,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Show Items</Button>
                </DialogTrigger>
                <DialogContent className=" max-w-6xl">
                    {/* <DialogHeader>
                        <DialogTitle>Product : {item.name}</DialogTitle>
                    </DialogHeader> */}
                    <div className="flex gap-8">
                        <Carousel className=" flex items-center gap-8">
                            <CarouselPrevious className=" relative " />
                            <CarouselContent className="w-[400px] ">
                                {item.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Card className="w-[350px] ">
                                            <CardContent className="flex aspect-square items-center justify-center p-3 ">
                                                <Image
                                                    alt="Picture of t   he author"
                                                    src={image}
                                                    width={600}
                                                    height={600}
                                                    className="rounded-lg"
                                                ></Image>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className=" relative" />
                        </Carousel>
                        <div className="">
                            <DialogTitle>Product : {item.name}</DialogTitle>
                            <div className=" grid grid-cols-3 gap-3 mt-4 mb-4">
                                {item?.versions?.map((version, index) => (
                                    <Button variant={'ghost'} className=" border" key={index}>
                                        {version.color}
                                    </Button>
                                ))}
                            </div>
                            <Card>
                                <CardHeader className="">
                                    <div className="flex items-center">
                                        <CircleDollarSign />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium leading-none">Total price:</p>
                                            <div className="flex items-baseline">
                                                <p className="text-sm text-muted-foreground line-through">
                                                    {item.price} Đ
                                                </p>

                                                <p className="ml-3 text-lg ">
                                                    {item.price} Đ {`( -${item.discount}%)`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex gap-3  flex-col">
                                    <div className="flex border-input justify-center items-center">
                                        <span>Quantity</span>
                                        <div>
                                            <div
                                                className={
                                                    buttonVariants({ variant: 'outline' }) +
                                                    ' p-0 flex justify-center items-center'
                                                }
                                            >
                                                <Button
                                                    size={'icon'}
                                                    onClick={() => {
                                                        quantity > 1 && setQuantity(quantity + 1);
                                                    }}
                                                >
                                                    <Minus />
                                                </Button>
                                                <h3 className=" m-5">{quantity}</h3>
                                                <Button
                                                    className=""
                                                    size={'icon'}
                                                    onClick={() => {
                                                        setQuantity(quantity + 1);
                                                    }}
                                                >
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center flex-1">
                                        <Button type="submit" className=" flex-1 m-2">
                                            Buy now
                                        </Button>
                                        <Button
                                            asChild
                                            type="submit"
                                            className="flex-1 m-2"
                                            onClick={() => {
                                                userId && addToCart({ product_id: item._id, quantity: quantity });
                                            }}
                                        >
                                            <Link href='/home/cart'>
                                                Add to cart
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    {/* <DialogFooter>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DetailProduct;
