import { Button } from '@/components/ui/button';
import asus from '../../../../Images/ASUS vivobook/den.jpg';
import { deliveringData, notExaminedData, completedData, deleteData, returnData, allData } from '../sample-data';
import { Pen } from 'lucide-react';

export default function DetailOrder({
    statusOrder,
    handleShowMoreDetailOrder,
}: {
    statusOrder: string;
    handleShowMoreDetailOrder: (order: {
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
    }) => void;
}) {
    let isEmpty = false;
    let obj = allData;
    switch (statusOrder) {
        case 'Trả hàng/Hoàn tiền':
            obj = returnData;
            break;
        case 'Đã hủy':
            obj = deleteData;
            break;
        case 'Hoàn thành':
            obj = completedData;
            break;
        case 'Đang vận chuyển':
            obj = deliveringData;
            break;
        case 'Chờ xử lý':
            obj = notExaminedData;
            break;
        case 'Tất cả':
            obj = allData;
    }
    const handleSelectOrder = (order: {
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
    }) => {
        handleShowMoreDetailOrder(order);
    };
    if (obj === undefined) isEmpty = true;
    return (
        <div>
            {!isEmpty &&
                obj.map((items, index) => (
                    <div key={index} className="w-full mb-[12px] border px-8 py-6 rounded-lg">
                        <div className="flex flex-row-reverse">
                            <p className="text-[14px] uppercase font-bold">{items.status}</p>
                        </div>
                        <div className="border border-w-1 h-[1px] mt-[12px]"></div>
                        <div className="flex mt-3 items-center">
                            <img src={asus.src} width={100} height={100} alt="Product" />
                            <div className="flex flex-auto flex-col pl-3">
                                <h3 className="font-bold text-[16px]">{items.orderProduct.name}</h3>
                                <p className="text-[14px]">{items.orderProduct.version}</p>
                                <p className="text-[14px]">x{items.orderProduct.quantity}</p>
                            </div>
                            <p className="text-[14px]">
                                {items.orderProduct.price}
                                <span className="underline text-[8px] inline-block align-top">đ</span>
                            </p>
                        </div>
                        <div className="border border-w-1 h-[1px] mt-[12px]"></div>
                        <div className="flex mt-4 justify-end items-center">
                            <Button onClick={() => handleShowMoreDetailOrder(items)}>
                                <Pen className="mr-1" size={20} />
                                Chi tiết
                            </Button>
                            <h3 className="text-[14px] pr-[10px] ml-[10px]">Thành tiền: </h3>
                            <p className="text-[24px] w-24">
                                {items.totalprice}
                                <span className="underline text-[14px] inline-block align-top">đ</span>
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
