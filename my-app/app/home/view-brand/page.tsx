'use client';
import { MenubarDemo } from '../../home/dashboard/category/page';
import DisplayedItem from '../../home/dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../../home/dashboard/breadcrumb/page';
import { laptopData } from '../../home/dashboard/sample-data';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '../../../components/ui/badge';

export default function ViewBrand() {
    const category = localStorage.getItem('category') || ' ';
    const brand = localStorage.getItem('brand') || ' ';

    return (
        <div className="flex flex-col items-center">
            <BreadcrumbWithCustomSeparator brand={brand} reverse={'true'} />
            <DisplayedItem brand={brand} category="Laptop" reverse={'true'} />
            <DisplayedItem brand={brand} category="Tablet" reverse={'true'} />
            <DisplayedItem brand={brand} category="Điện thoại" reverse={'true'} />
            <DisplayedItem brand={brand} category="Đồng hồ" reverse={'true'} />
            <DisplayedItem brand={brand} category="Phụ kiện" reverse={'true'} />
        </div>
    );
}
