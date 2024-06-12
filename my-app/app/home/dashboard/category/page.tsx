'use client';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Headset, Laptop, Smartphone, Tablet, Watch } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import NewMenubarMenu from '../menubar/page';

export function MenubarDemo() {
    const [openDropdown, setOpenDropdown] = useState(false);
    return (
        <div className="flex h-12 justify-center items-center border border-y w-full">
            <Menubar className="border-none">
                <NewMenubarMenu
                    icon={
                        <div>
                            <Smartphone />
                        </div>
                    }
                    category="Điện thoại"
                    brands={['Oppo', 'Samsung', 'Huawei', 'Xiaomi', 'Apple', 'Nokia']}
                />
                <NewMenubarMenu
                    icon={
                        <div>
                            <Laptop />
                        </div>
                    }
                    category="Máy tính"
                    brands={['Msi', 'Hp', 'Acer', 'Macbook', 'Dell', 'Asus']}
                />
                <NewMenubarMenu
                    icon={
                        <div>
                            <Watch />
                        </div>
                    }
                    category="Đồng hồ"
                    brands={['Garmin', 'Samsung', 'Apple']}
                />
                <NewMenubarMenu
                    icon={
                        <div>
                            <Tablet />
                        </div>
                    }
                    category="Tablet"
                    brands={['Xiaomi', 'Oppo', 'Huawei', 'Samsung', 'Ipad']}
                />
                <NewMenubarMenu
                    icon={
                        <div>
                            <Headset />
                        </div>
                    }
                    category="Phụ kiện"
                    brands={['Ốp lưng', 'Tai nghe', 'Sạc dự phòng', 'Chuột', 'Bàn phím']}
                />
            </Menubar>
        </div>
    );
}
