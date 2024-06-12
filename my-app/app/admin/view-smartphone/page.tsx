'use client';
import { MenubarDemo } from '../../home/dashboard/category/page';
import DisplayedItem from '../../home/dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../../home/dashboard/breadcrumb/page';
import Filter from '../../home/dashboard/filter/page';
import { useState } from 'react';

export default function ViewSmartPhone() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Oppo', 'Samsung', 'Huawei', 'Xiaomi', 'Apple', 'Nokia']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand !== undefined) setBrands([brand]);
        else setBrands(['Oppo', 'Samsung', 'Huawei', 'Xiaomi', 'Apple', 'Nokia']);
    };
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Điện thoại" />
            <Filter category="Điện thoại" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Điện thoại" brand={brand} price={price} />;
            })}
        </div>
    );
}
