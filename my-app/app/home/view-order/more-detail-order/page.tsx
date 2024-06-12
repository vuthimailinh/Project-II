'use client';
import { Button } from '@/components/ui/button';
import { deliveringData } from '../sample-data';
import { ChevronLeft } from 'lucide-react';
import asus from '../../../../Images/ASUS vivobook/den.jpg';
import { Table, TableHeader, TableCell, TableRow, TableHead, TableBody, TableCaption } from '@/components/ui/table';

export default function MoreDetailOrder({
    selectedOrder,
    handleShowDetailOrder,
}: {
    selectedOrder: {
        totalprice: string;
        status: string;
        date: string;
        user_id: string;
        address: string;
        deliver_id: string;
        phoneNumber: string;
        orderProduct: {
            order_id: string;
            product_id: string;
            name: string;
            version: string;
            store_id: string;
            quantity: string;
            price: string;
            discount: string;
        };
    };
    handleShowDetailOrder: () => void;
}) {

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex border rounded-2 mb-[12px]">
                <Button onClick={handleShowDetailOrder}>
                    <ChevronLeft className="mr-[5px]" />
                    TRỞ LẠI
                </Button>
            </div>
            <div className="w-full mb-[12px] border p-[24px] rounded-lg">
                <p className="text-[20px]">{selectedOrder.status}</p>
                <div className="border border-w-1 h-[1px] mt-[12px]"></div>
                <div className="flex mt-3 items-center">
                    <img src={asus.src} width={100} height={100} />
                    <div className="flex flex-auto flex-col pl-3">
                        <h3 className="font-bold text-[16px]">{selectedOrder.orderProduct.name}</h3>
                        <p className="text-[14px]">{selectedOrder.orderProduct.version}</p>
                        <p className="text-[14px]">x{selectedOrder.orderProduct.quantity}</p>
                    </div>
                    <p className="text-[14px]">
                        {selectedOrder.orderProduct.price}
                        <span className="underline text-[8px] inline-block align-top">đ</span>
                    </p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground w-full text-center ">Thông tin chi tiết khác</p>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Mã đơn hàng</TableCell>
                            <TableCell>{selectedOrder.orderProduct.order_id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Thời gian đặt hàng</TableCell>
                            <TableCell>{selectedOrder.date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Số điện thoại người nhận</TableCell>
                            <TableCell>{selectedOrder.phoneNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Địa chỉ giao hàng</TableCell>
                            <TableCell>{selectedOrder.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Phí vận chuyển</TableCell>
                            <TableCell>{selectedOrder.orderProduct.discount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Phương thức thanh toán</TableCell>
                            <TableCell>{selectedOrder.date}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
