import { CarouselPlugin } from '@/app/home/dashboard/carosel/page';
import { MenubarDemo } from '@/app/home/dashboard/category/page';
import DisplayedItem from '@/app/home/dashboard/displayeditem/page';
import ListBrand from '@/app/home/dashboard/listbrand/page';
import Header from '../header/page';
import Sidebar from '../sidebar/page';

export default function ManageProduct() {
    return (
        <div>
            <div className="flex flex-col items-center mt-8">
                <MenubarDemo />
                <ListBrand />
                <DisplayedItem category="Laptop" />
                <DisplayedItem category="Điện thoại" />
                <DisplayedItem category="Tablet" />
                <DisplayedItem category="Đồng hồ" />
                <DisplayedItem category="Phụ kiện" />
            </div>
        </div>
    );
}
