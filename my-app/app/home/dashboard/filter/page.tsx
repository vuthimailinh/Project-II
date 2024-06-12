'use client';

import { string, z } from 'zod';

import { Label } from '@/components/ui/label';
import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { accessoryData, laptopData, phoneData, tabletData, watchData } from '../sample-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterIcon } from 'lucide-react';
import { useState } from 'react';

type FormSchema = {
    brand: string;
    price: string;
};

const Filter = ({
    category,
    filterPrices,
}: {
    category: string;
    filterPrices: (price: number, brand?: string) => void;
}) => {
    let brands: string[] = [];
    switch (category) {
        case 'Điện thoại':
            brands = ['Oppo', 'Samsung', 'Huawei', 'Xiaomi', 'Apple', 'Nokia'];
            break;
        case 'Máy tính':
            brands = ['Msi', 'Hp', 'Acer', 'Macbook', 'Dell', 'Asus'];
            break;
        case 'Đồng hồ':
            brands = ['Garmin', 'Samsung', 'Apple'];
            break;
        case 'Tablet':
            brands = ['Xiaomi', 'Oppo', 'Huawei', 'Samsung', 'Ipad'];
            break;
        case 'Phụ kiện':
            brands = ['Ốp lưng', 'Tai nghe', 'Sạc dự phòng', 'Chuột', 'Bàn phím'];
            break;
    }
    const form = useForm<FormSchema>();
    function onSubmit(data: FormSchema) {
        filterPrices(parseInt(data.price), data.brand);
    }
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    return (
        <div className="flex items-center space-x-10 mt-7 h-12 justify-start py-9 border-y w-3/4">
            <h1 className="my-2">Bộ lọc</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] justify-between flex items-center">
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem className="flex items-center w-[150px]">
                                <FormLabel className="w-[60px] text-sm my-2">Hãng</FormLabel>
                                <Select
                                    onValueChange={(value: string) => {
                                        field.onChange(value);
                                        setBrand(value);
                                    }}
                                    value={brand}
                                >
                                    <SelectContent>
                                        {brands.map((brand, index) => {
                                            return <SelectItem value={brand} key={index}>{brand}</SelectItem>;
                                        })}
                                    </SelectContent>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="flex items-center ml-9 w-[190px]">
                                <FormLabel className="w-[90px] text-sm my-2">Giá tiền</FormLabel>
                                <Select
                                    defaultValue=""
                                    onValueChange={(value: string) => {
                                        field.onChange(value);
                                        setPrice(value);
                                    }}
                                    value={price}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">Dưới 10 triệu</SelectItem>
                                        <SelectItem value="1">10 - 20 triệu</SelectItem>
                                        <SelectItem value="2">20 - 30 triệu</SelectItem>
                                        <SelectItem value="3">Trên 30 triệu</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-2">
                        <FilterIcon width={20} />
                    </Button>
                </form>
            </Form>
            <Button
                className="mt-2"
                onClick={() => {
                    filterPrices(-1);
                    setBrand('');
                    setPrice('');
                }}
            >
                Làm mới
            </Button>
        </div>
    );
};
export default Filter;
