"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useState, useEffect } from "react"
import Link from "next/link";
import axios from "axios"

interface CartItem {
    product_id: string;
    image: string;
    name: string;
    version: string;
    quantity: number;
    price: number;
    checked: boolean;
}

export default function Cart() {
    let [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (typeof window !== "undefined") {
                const axiosInstance = axios.create({
                    baseURL: process.env.NEXT_PUBLIC_API_URL,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("refresh_token")}`
                    }
                });

                try {
                    const response = await axiosInstance.get('/user/view-cart-of-user');
                    //console.log(response.data.data);
                    setCartItems(response.data.data);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        console.error(`Error fetching cart data: ${error.response.status} - ${error.response.statusText}`);
                    } else {
                        console.error('Error fetching cart data:', error);
                    }
                }
            }
        };

        fetchCartItems();
    }, []);

    let updateQuantity = async (_id: string, newQuantity: number) => {
        const token = localStorage.getItem('refresh_token');
        try {
            const response = await axios.put(
                'http://localhost:8080/api/v1/user/update-quantity',
                { productId: _id, quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //console.log(response.data.cartProduct.data.data);
            
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error updating the quantity:', error);
        }
    };

    const increaseNumber = (_id: string) => {
        const item = cartItems.find(item => item.product_id === _id);
        if (item) {
            updateQuantity(_id, item.quantity + 1);
        }
    };

    const decreaseNumber = (_id: string) => {
        const item = cartItems.find(item => item.product_id === _id);
        if (item && item.quantity > 1) {
            updateQuantity(_id, item.quantity - 1);
        } else if (item && item.quantity === 1) {
            // Handle removing the item from the cart if the quantity is 0
            removeProduct(item.product_id);
        }
    };

    const clickCheckbox = (_id: string) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product_id === _id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setCartItems(prevItems =>
            prevItems.map(item => ({ ...item, checked: !selectAll }))
        );
    };

    const removeProduct = async (_id: string) => {
        const token = localStorage.getItem('refresh_token');
        try {
            const response = await axios.delete(
                'http://localhost:8080/api/v1/user/remove-product',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        productId: _id
                    }
                }
            );
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error removing the product:', error);
        }
    };

    const handleDeleteSelected = () => {
        cartItems.forEach(item => {
            if (item.checked) {
                removeProduct(item.product_id);
            }
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectAll || item.checked) {
                return total + item.price * item.quantity;
            }
            return total;
        }, 0);
    };

    const handlePayment = () => {
        const selectedItems = cartItems.filter(item => item.checked);
        const queryString = selectedItems.map(item => `selectedItems[]=${encodeURIComponent(item.product_id)}`).join('&');
        window.location.href = `/payment?${queryString}`;
    };

    return (
        <div className="w-5/6 mt-20 mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox checked={selectAll} onClick={handleSelectAll} /></TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Phan loai</TableHead>
                        <TableHead>So luong</TableHead>
                        <TableHead className="text-right">Gia</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartItems.map((cart) => (
                        <TableRow key={cart.product_id}>
                            <TableCell><Checkbox checked={cart.checked} onClick={() => clickCheckbox(cart.product_id)} /></TableCell>
                            <TableCell className="w-1/6 h-1/6"><img src={cart.image} alt="Anh san pham" /></TableCell>
                            <TableCell className="font-medium">{cart.name}</TableCell>
                            <TableCell>{cart.version}</TableCell>
                            <TableCell><div className="flex gap-2 items-center">
                                <Button onClick={() => decreaseNumber(cart.product_id)}>-</Button>
                                {cart.quantity}
                                <Button onClick={() => increaseNumber(cart.product_id)}>+</Button>
                            </div></TableCell>
                            <TableCell className="text-right">{cart.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between">
                <Button onClick={handleDeleteSelected}>Xoa</Button>
                <div className="flex gap-10 items-center">
                    Total: {calculateTotal()}
                    <Button onClick={handlePayment}>Thanh Toan</Button>
                </div>
            </div>
        </div>
    )
}
