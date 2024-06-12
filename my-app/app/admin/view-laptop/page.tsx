'use client';
import { MenubarDemo } from '../../home/dashboard/category/page';
import DisplayedItem from '../../home/dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../../home/dashboard/breadcrumb/page';
import Filter from '../../home/dashboard/filter/page';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ViewLaptop() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Msi', 'Hp', 'Acer', 'Macbook', 'Dell', 'Asus']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand !== undefined) setBrands([brand]);
        else setBrands(['Msi', 'Hp', 'Acer', 'Macbook', 'Dell', 'Asus']);
    };
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Máy tính" />
            <Filter category="Máy tính" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Máy tính" brand={brand} price={price} />;
            })}
        </div>
    );
}
