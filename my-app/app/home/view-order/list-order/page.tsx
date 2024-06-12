'use client';
import { Button } from '@/components/ui/button';
import DetailOrder from '../detail-order/page';
import MoreDetailOrder from '../more-detail-order/page';
import { useState } from 'react';

export default function ListOrderFrame() {
    const [statusOrder, setStatusOrder] = useState('Tất cả');
    const [showDetailOrder, setShowDetailOrder] = useState(true);
    const handleShowDetailOrder = () => {
        setShowDetailOrder(true);
    };
    const [selectedOrder, setSelectedOrder] = useState({totalprice: "",
        status: "",
        date: "",
        user_id: "",
        address: "",
        deliver_id: "",
        phoneNumber: "",
        orderProduct: {
            order_id: "",
            product_id: "",
            name: "",
            version: "",
            store_id: "",
            quantity: "",
            price: "",
            discount: ""
        }
    });
    const handleShowMoreDetailOrder = (
        items: {
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
        },
    ) => {
        setSelectedOrder(items);
        setShowDetailOrder(false);
    };
    const handleSetStatusOrder = (newStatus: string) => {
        setStatusOrder(newStatus);
    };
    return (
        <div className=" h-auto  flex flex-1 flex-col">
            {showDetailOrder ? (
                <div>
                    <div className="flex border rounded-2 mb-[12px]">
                        <Button className="w-1/6 rounded-none" onClick={() => handleSetStatusOrder('Tất cả')}>
                            Tất cả
                        </Button>
                        <Button className="w-1/6 rounded-none" onClick={() => handleSetStatusOrder('Chờ xử lý')}>
                            Chờ xử lý
                        </Button>
                        <Button className="w-1/6 rounded-none" onClick={() => handleSetStatusOrder('Đang vận chuyển')}>
                            Đang vận chuyển
                        </Button>
                        <Button className="w-1/6 rounded-none" onClick={() => handleSetStatusOrder('Hoàn thành')}>
                            Hoàn thành
                        </Button>
                        <Button className="w-1/6 rounded-none" onClick={() => handleSetStatusOrder('Đã hủy')}>
                            Đã hủy
                        </Button>
                        <Button
                            className="w-1/6 rounded-none"
                            onClick={() => handleSetStatusOrder('Trả hàng/Hoàn tiền')}
                        >
                            Trả hàng/Hoàn tiền
                        </Button>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <DetailOrder statusOrder={statusOrder} handleShowMoreDetailOrder={handleShowMoreDetailOrder} />
                    </div>
                </div>
            ):
            (
                <div>
                    <MoreDetailOrder selectedOrder={selectedOrder} handleShowDetailOrder={handleShowDetailOrder} />
                </div>
            )}
        </div>
    );
}
