export const notExaminedData = [
    {
        totalprice: '75.00',
        status: 'Chờ xử lý',
        date: '2024-04-16',
        user_id: '60fa26b99569e02d843f8e2a',
        address: '456 Elm St, Townsville',
        deliver_id: '60fa26b99569e02d843f8e2b',
        phoneNumber: '987-654-3210',
        orderProduct: {
            order_id: '60fa26b99569e02d843f8e2c',
            product_id: '60fa26b99569e02d843f8e2d',
            name: 'dsvfsdgdsg',
            version: '1.1.1',
            store_id: '60fa26b99569e02d843f8e2e',
            quantity: '3',
            price: '25.00',
            discount: '0',
        },
    },
];
export const deliveringData = [
    {
        totalprice: '210.00',
        status: 'Đang vận chuyển',
        date: '2024-04-15',
        user_id: '60fa26b99569e02d843f8e2f',
        address: '789 Oak St, Villagetown',
        deliver_id: '60fa26b99569e02d843f8e30',
        phoneNumber: '555-123-4567',
        orderProduct: {
            order_id: '60fa26b99569e02d843f8e31',
            product_id: '60fa26b99569e02d843f8e32',
            name: 'dsvfsdgdsg',
            version: '1.1.1',
            store_id: '60fa26b99569e02d843f8e33',
            quantity: '1',
            price: '200.00',
            discount: '10',
        },
    },
];
export const completedData = [
    {
        totalprice: '45.75',
        status: 'Hoàn thành',
        date: '2024-04-14',
        user_id: '60fa26b99569e02d843f8e34',
        address: '321 Pine St, Hamletville',
        deliver_id: '60fa26b99569e02d843f8e35',
        phoneNumber: '777-888-9999',
        orderProduct: {
            order_id: '60fa26b99569e02d843f8e36',
            product_id: '60fa26b99569e02d843f8e37',
            name: 'dsvfsdgdsg',
            version: '1.1.1',
            store_id: '60fa26b99569e02d843f8e38',
            quantity: '5',
            price: '9.15',
            discount: '0.25',
        },
    },
    {
        totalprice: '50.40',
        status: 'Hoàn thành',
        date: '2024-04-11',
        user_id: '60fa26b99569e02d843f8e43',
        address: '789 Walnut St, Mountainview',
        deliver_id: '60fa26b99569e02d843f8e44',
        phoneNumber: '777-999-1111',
        orderProduct: {
            order_id: '60fa26b99569e02d843f8e45',
            product_id: '60fa26b99569e02d843f8e46',
            name: 'dsvfsdgdsg',
            version: '1.1.1',
            store_id: '60fa26b99569e02d843f8e47',
            quantity: '4',
            price: '12.60',
            discount: '1.20',
        },
    },
];

export const deleteData = [];
export const returnData = [];
export let allData = [...notExaminedData,...deliveringData,...completedData,...returnData,...deleteData];

