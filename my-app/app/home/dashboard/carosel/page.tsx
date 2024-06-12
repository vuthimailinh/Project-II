'use client';
import * as React from 'react';
import { laptopData, phoneData } from '../sample-data';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
export function CarouselPlugin() {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    const router = useRouter();
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-[1600px] mb-6 "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                <CarouselItem onClick={() => router.push('/home/view-smartphone')}>
                    <img
                        className="w-[1920px] h-[500px]"
                        src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/1920x450-1920x450.jpg"
                    />
                </CarouselItem>
                <CarouselItem onClick={() => router.push('/home/view-smartphone')}>
                    <img
                        className="w-[1920px] h-[500px]"
                        src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/720x220-720x220-75.png"
                    />
                </CarouselItem>
                <CarouselItem onClick={() => router.push('/home/view-laptop')}>
                    <img
                        className="w-[1920px] h-[500px]"
                        src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/Laptop-Gaming-Chung-MB-2-720x220.png"
                    />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="border-none -ml-7" />
            <CarouselNext className="border-none -mr-7" />
        </Carousel>
    );
}
