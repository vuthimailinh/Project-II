'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { CircleUserRound, CreditCard, LifeBuoy, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenuBar() {
    const user: {
        _id: string;
        email: string;
        username: string;
        status: string;
        role: string;
    } | null = localStorage.getItem('user') ? JSON.parse(String(localStorage.getItem('user'))) : null;

    const router = useRouter();
    return (
        <div className="flex space-x-1 w-[250px] h-[740px] p-2 border rounded-lg items-center flex-col">
            <div className="flex ml-0 text-base items-center space-x-1 pt-3 pb-[15px]">
                <CircleUserRound size={35} />
                <p className="text-xl">{user?.username}</p>
            </div>
            <Button className="w-full mb-[2px] justify-start" onClick={() => router.push('/home/user')}>
                <User className="mr-2  h-4 w-4 ml-3" />
                <span>Tài khoản của tôi</span>
            </Button>
            <Button className="w-full mb-[2px] justify-start " onClick={() => router.push('/home/view-order')}>
                <CreditCard className="mr-2 h-4 w-4 ml-3" />
                <span>Đơn hàng</span>
            </Button>
            <Button className="w-full mb-[2px] justify-start">
                <LifeBuoy className="mr-2 h-4 w-4 ml-3" />
                <span>Hỗ trợ</span>
            </Button>
        </div>
    );
}
