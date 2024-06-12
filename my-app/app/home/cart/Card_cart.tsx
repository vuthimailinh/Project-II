import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
interface CartItem {
    product_id: string;
    image: string;
    name: string;
    version: string;
    quantity: number;
    price: number;
    checked: boolean;
}

const Card_cart = ({ item }: { item: CartItem }) => {
    const [cart, setCart] = useState(item);
    const [quantity, setQuantity] = useState<number>(item.quantity);
    return (
        <TableRow key={cart.product_id}>
            <TableCell>
                <Checkbox checked={cart.checked} onClick={() => {}} />
            </TableCell>
            <TableCell className="w-1/6 h-1/6">
                <img src={cart.image} alt="Anh san pham" />
            </TableCell>
            <TableCell className="font-medium">{cart.name}</TableCell>
            <TableCell>{cart.version}</TableCell>
            <TableCell>
                <div className="flex gap-2 items-center">
                    <Button
                        onClick={() => {
                            setQuantity(quantity - 1);
                            setCart({ ...cart, quantity: quantity });
                        }}
                    >
                        -
                    </Button>
                    {cart.quantity}
                    <Button
                        onClick={() => {
                            setCart({ ...cart, quantity: cart.quantity++ });
                        }}
                    >
                        +
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-right">{cart.price}</TableCell>
        </TableRow>
    );
};

export default Card_cart;
