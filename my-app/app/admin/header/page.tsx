'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-select';
import axios from 'axios';
import {
    Bell,
    CircleUserRound,
    CreditCard,
    LifeBuoy,
    LogIn,
    LogOut,
    MonitorCheck,
    SearchIcon,
    Settings,
    ShoppingCart,
    User,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, memo, useContext } from 'react';
import { useRouter } from 'next/navigation';
type User = {
    _id: string;
    email: string;
    username: string;
    status: string;
    role: string;
};
function Header() {
    // const userr: User | null = JSON.parse(localStorage.getItem("user"||null)||" ");
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser !== null ? JSON.parse(storedUser) : null;
    });

    const router = useRouter();
    // console.log(user);

    const logOut = async () => {
        try {
            setUser(null);
            const reqBody = {
                refreshToken: localStorage.getItem('refresh_token'),
            };
            const response = await fetch('http://localhost:8080/api/v1/log-out', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(reqBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Success log out:');
            localStorage.clear();
            window.location.replace('/');
            router.push("http://localhost:3000/home/dashboard")
            // setUser(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center w-full justify-between  p-2 lg:pl-8 lg:pr-7 h-86 ">
            <div className="flex items-center lg:space-x-4 ">
                {!localStorage.getItem('access_token') ? (
                    <Link href="/auth/login">
                        <Button>
                            <LogIn className="mr-2" />
                            ĐĂNG NHẬP
                        </Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex space-x-1 items-center ">
                                <CircleUserRound size={35} />
                                <div className="flex flex-col">
                                    <p className="lg:text-lg text-xs font-bold ">{user?.username}</p>
                                    <p className="lg:text-xs text-[9px] ">{user?.role}</p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <Link href="/home/ser">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Tài khoản của tôi</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Cài đặt</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                <span>Hỗ trợ</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}
export default Header;