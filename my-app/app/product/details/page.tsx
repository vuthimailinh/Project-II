"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { BellRing, CircleDollarSign } from "lucide-react";
interface IItem {
    name: string;
    price: number;
    discount: number;
    images: string[];
    description?: string;
    versions: {
        color: string;
        memory: string;
        price: number;
    }[];
}

const Page: FC = () => {
    const [item, setItem] = useState<IItem>({
        name: "Iphone 14",
        price: 1000,
        discount: 40,

        images: [
            "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQdVfDUaINyZJbqFIqo4aWQNo9i7M36i2z-4pxEqyLj24vTJXRCcakk_EMW7N5wMaeznQ2CosAFhzsqgifrV0iNrLP7XEz4dYnd5AMfkqA&usqp=CAE",

            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTxmedas04p5zvAFFNgKcMmXyaaNdL0DsPZonMIs4G-Ybtj0r8fHtUjlch2gXje4dwlpbUI2zMwmDDRQmmzCS2_9Afph_gI-0FNp4QwQy4RLp2ewyjKQ9or&usqp=CAE",
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSB4nuv1UmJDp-PuTMFyZ0Ofa1m5Nxs4EEiEYRC3Whu21kPDmZ5QVKTCEUb5sWCjmEHElWKFpvvasXyDeBmL5i1y67FoS3Lw19At63va-o&usqp=CAE",
        ],
        versions: [
            {
                color: "black",
                memory: "16GB",
                price: 1000,
            },
            {
                color: "black",
                memory: "32GB",
                price: 2000,
            },
            {
                color: "white",
                memory: "32GB",
                price: 2990,
            },
            {
                color: "Purple",
                memory: "32GB",
                price: 2090,
            },
            {
                color: "Purple",
                memory: "16GB",
                price: 1090,
            },
            {
                color: "Blue",
                memory: "32GB",
                price: 2090,
            },
        ],
    });

    const [price, setPrice] = useState<number>();

    useEffect(() => {
        setPrice(item.price);
    }, [item]);
    console.log(item)
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
                                {item.versions.map((version, index) => (
                                    <Button
                                        variant={"ghost"}
                                        className=" border"
                                        key={index}
                                        onClick={() => setPrice(version.price)}
                                    >
                                        {version.memory} / {version.color}
                                    </Button>
                                ))}
                            </div>
                            <Card>
                                <CardHeader className="">
                                    <div className="flex items-center">
                                        <CircleDollarSign />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium leading-none">
                                                Total price:
                                            </p>
                                            <div className="flex items-baseline">
                                                <p className="text-sm text-muted-foreground line-through">
                                                    {item.price} đ
                                                </p>

                                                <p className="ml-3 text-lg ">
                                                    {price} đ{" "}
                                                    {`( -${item.discount}%)`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex gap-3">
                                    <Button type="submit" className=" flex-1">
                                        Buy now
                                    </Button>
                                    <Button type="submit" className="flex-1">
                                        Add to cart
                                    </Button>
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

export default Page;
