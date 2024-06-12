import { useEffect } from 'react';
import { MenubarDemo } from './category/page';
import DisplayedItem from './displayeditem/page';
import ListBrand from './listbrand/page';
import { CarouselPlugin } from './carosel/page';
export default async function Dashboard() {
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <CarouselPlugin />
            <ListBrand />
            <DisplayedItem category="Máy tính" />
            <DisplayedItem category="Điện thoại" />
            <DisplayedItem category="Tablet" />
            <DisplayedItem category="Đồng hồ" />
            <DisplayedItem category="Phụ kiện" />
        </div>
    );
}
