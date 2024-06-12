'use client';
import { MenubarDemo } from '../../home/dashboard/category/page';
import DisplayedItem from '../../home/dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../../home/dashboard/breadcrumb/page';
import { phoneData } from '../../home/dashboard/sample-data';
import Filter from '../../home/dashboard/filter/page';
import { useState } from 'react';

export default function ViewAccessory() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Ốp lưng', 'Tai nghe', 'Sạc dự phòng', 'Chuột', 'Bàn phím']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand !== undefined) setBrands([brand]);
        else setBrands(['Ốp lưng', 'Tai nghe', 'Sạc dự phòng', 'Chuột', 'Bàn phím']);
    };
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Phụ kiện" />
            <Filter category="Phụ kiện" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Phụ kiện" brand={brand} price={price} />;
            })}
        </div>
    );
}
