'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { useEffect, useState } from 'react';
import ComboboxDemo from './combobox';
import axios from 'axios';
import { IProduct } from '../cart/page';
import { formatNumberWithDots } from '@/lib/utils';

interface CartItem {
    id: string;
    price: number;
    name: string;
    class: string[];
    number: number;
    imageLink: string;
    checked: boolean;
}

export interface IOrderProduct {
    product_id: IProduct;
    store_id?: string;
    quantity: string;
    price: string | number;
    discount: string;
    status?: string;
}

export interface IOrder {
    _id: string;
    totalprice: string;
    date: string;
    user_id: string;
    address: string;
    deliver_id?: string;
    phoneNumber: string;
    status: string;
    orderProduct: IOrderProduct[];
}

export default function Payment() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [orders, setOrders] = useState<IOrder[]>();
    useEffect(() => {
        axios
            .create({
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .get('/cart/view-order')
            .then((res) => {
                setOrders(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log(orders);

    return (
        <>
            {orders?.map((order) => {
                return (
                    <div className="w-5/6 mt-20 mx-auto border-black">
                        <div className="flex flex-col">
                            <div className="flex justify-between font-bold">
                                Địa chỉ nhận hàng
                                {/*<Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="default">Update</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Update</DialogTitle>
                                        </DialogHeader>
                                        <ComboboxDemo></ComboboxDemo>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>*/}
                            </div>
                            <div>{order.address}</div>
                            <div>{order.phoneNumber}</div>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Tên sản phẩm </TableHead>
                                        <TableHead>Phân loại</TableHead>
                                        <TableHead>Số lượng</TableHead>
                                        <TableHead className="text-right">Giá</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.orderProduct.map((item) => {
                                        return (
                                            <TableRow key={item.product_id._id}>
                                                <TableCell className="w-1/12 h-1/12">
                                                    <img src={item.product_id.images[0]} alt="Anh san pham" />
                                                </TableCell>
                                                <TableCell className="font-medium uppercase">{item.product_id.name}</TableCell>
                                                <TableCell>{}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell className="text-right">
                                                {formatNumberWithDots(Number(item.price))}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-between">
                            <div>Tổng: {formatNumberWithDots(Number(order.totalprice))}</div>
                            <div>
                                <Button>{order.status}</Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
