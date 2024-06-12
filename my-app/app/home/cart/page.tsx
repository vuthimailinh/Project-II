'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { formatNumberWithDots } from '@/lib/utils';

interface CartItem {
    product_id: string;
    image: string;
    name: string;
    version: string;
    quantity: number;
    price: number;
    checked: boolean;
    discount?: string;
}

export interface IProduct {
    _id: string;
    name: string;
    discount: number;
    price: number;
    brand: string;
    version: [string];
    category: string;
    images: [string];
    items: [string];
}

export default function Cart() {
    let [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const [address, setAddress] = useState<string>();
    const [phoneNumber, setphoneNumber] = useState<string>();

    useEffect(() => {
        const fetchCartItems = () => {
            const axiosInstance = axios
                .create({
                    baseURL: process.env.NEXT_PUBLIC_API_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                .get('/cart/view-cart')
                .then((response) => {
                    let data: { product_id: IProduct; quantity: number }[] = response.data.data.cartProduct;
                    console.log(data);

                    setCartItems(
                        data.map((item, index) => {
                            const { product_id, quantity } = item;
                            return {
                                product_id: product_id._id,
                                image: product_id.images[0],
                                name: product_id.name,
                                version: JSON.stringify(product_id.version[0]),
                                quantity: quantity,
                                price: product_id.price,
                                checked: false,
                            };
                        }),
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchCartItems();
    }, []);

    const increaseNumber = (product_id: string) => {
        setCartItems(
            cartItems.map((item) => {
                if (item.product_id === product_id) {
                    return { ...item, quantity: item.quantity + 1 };
                }

                return item;
            }),
        );

        updateCart();
    };

    const decreaseNumber = (product_id: string) => {
        setCartItems(
            cartItems.map((item) => {
                if (item.product_id === product_id) {
                    return { ...item, quantity: item.quantity - 1 };
                }

                return item;
            }),
        );

        updateCart();
    };

    const route = useRouter();

    const updateCart = () => {
        const token = localStorage.getItem('access_token');

        const updateReq: {
            product_id: string;
            quantity: number;
        }[] = cartItems.map((item) => {
            return {
                product_id: item.product_id,
                quantity: item.quantity,
            };
        });

        console.log(token);

        axios
            .create({
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .put(
                '/cart/update-cart',

                { cartProduct: updateReq },
            )
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        cartItems && cartItems.length > 0 && updateCart();
    }, [cartItems]);

    const clickCheckbox = (_id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.product_id === _id ? { ...item, checked: !item.checked } : item)),
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setCartItems((prevItems) => prevItems.map((item) => ({ ...item, checked: !selectAll })));
    };

    const removeProduct = async (_id: string) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.delete('http://localhost:8080/api/v1/user/remove-product', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    productId: _id,
                },
            });
            setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== _id));
        } catch (error) {
            console.error('Error removing the product:', error);
        }
    };

    const handleDeleteSelected = () => {
        setCartItems(cartItems.filter((item) => item.checked === false));
        console.log(cartItems);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectAll || item.checked) {
                return total + item.price * item.quantity;
            }
            return total;
        }, 0);
    };
    console.log(address, phoneNumber);

    const handlePayment = () => {
        const selectedItems = cartItems.filter((item) => item.checked);

        // window.location.href = `/payment?${queryString}`;

        if (address && phoneNumber) {
            const requestData: {
                totalprice: string;
                address: string;
                phoneNumber: string;
                orderProducts: {
                    product_id: string;
                    store_id?: string;
                    quantity: number;
                    price: string | number;
                    discount?: string;
                    status?: string;
                }[];
            } = {
                totalprice: String(calculateTotal()),
                address: address,
                phoneNumber: phoneNumber,
                orderProducts: selectedItems.map((item) => {
                    return {
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.price,
                        discount: item.discount,
                    };
                }),
            };
            const token = localStorage.getItem('access_token');

            axios
                .create({
                    baseURL: process.env.NEXT_PUBLIC_API_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                .put(
                    '/cart/checkout',

                    requestData,
                )
                .then((res) => {
                    selectedItems.forEach((item) => removeProduct(item.product_id));
                    route.push('/home/payment');
                })
                .catch((err) => console.log(err));
            console.log(requestData);
        }
    };

    return (
        <div className="w-5/6 mt-20 mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox checked={selectAll} onClick={handleSelectAll} />
                        </TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Phan loai</TableHead>
                        <TableHead>So luong</TableHead>
                        <TableHead className="text-right">Gia</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartItems.map((cart, index) => (
                        <TableRow key={cart.product_id}>
                            <TableCell>
                                <Checkbox checked={cart.checked} onClick={() => clickCheckbox(cart.product_id)} />
                            </TableCell>
                            <TableCell className="w-1/6 h-1/6">
                                <img src={cart.image} alt="Anh san pham" />
                            </TableCell>
                            <TableCell className="font-medium">{cart.name}</TableCell>
                            <TableCell>{cart.version}</TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Button onClick={() => decreaseNumber(cart.product_id)}>-</Button>
                                    {cart.quantity}
                                    <Button onClick={() => increaseNumber(cart.product_id)}>+</Button>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">{formatNumberWithDots(cart.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between">
                <Button onClick={handleDeleteSelected}>Xoa</Button>
                <div className="flex gap-10 items-center">
                    Total: {formatNumberWithDots(calculateTotal())}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={handlePayment}>Thanh Toan</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Thông tin thanh toán</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Địa chỉ
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Số điện thoại
                                    </Label>
                                    <Input
                                        id="username"
                                        className="col-span-3"
                                        onChange={(e) => {
                                            setphoneNumber(e.target.value);
                                        }}
                                    />
                                </div>

                                {cartItems.map((item) => {
                                    if (item.checked) {
                                        return <Button disabled>{item.name}</Button>;
                                    }
                                })}
                            </div>
                            <DialogFooter>
                                <Button type="submit">Tong tien : {calculateTotal()}</Button>

                                <Button type="submit" onClick={() => handlePayment()}>
                                    Thanh toan
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
