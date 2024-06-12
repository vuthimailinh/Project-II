import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { MonitorCheck, SeparatorHorizontal, SeparatorHorizontalIcon } from 'lucide-react';
import facebook from '../../Images/facebook.png';
import messenger from '../../Images/messenger.png';
import instagram from '../../Images/instagram.png';
import youtube from '../../Images/video.png';
import { Separator } from '@radix-ui/react-select';
import { MenubarSeparator } from '@radix-ui/react-menubar';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import logo from '@/public/442006968_7610173559097035_3639226673492589947_n.jpg';

export default function Footer() {
    return (
        <div className="w-full border border-t-[1px] flex lg:py-10 py-5 flex-col items-center space-y-4">
            <div className="flex lg:w-3/4 justify-between  ">
                <div className="w-1/2 pl-5 lg:w-2/3">
                    <Link href="/home/dashboard">
                        <Button variant={'custom'} className="lg:text-2xl text-xl font-bold  ">
                            <img src={logo.src} width={200} />
                        </Button>
                    </Link>
                    <blockquote className="lg:mt-6 mt-4 lg:text-base text-xs border-l-2 pl-3 italic ">
                        Chất lượng không chỉ là cam kết, mà là tôn chỉ của chúng tôi!
                    </blockquote>
                    <div className="flex  mt-4 space-x-2">
                        <img src={facebook.src} width={40} />
                        <img src={messenger.src} width={40} />
                        <img src={instagram.src} width={40} />
                        <img src={youtube.src} width={40} />
                    </div>
                </div>
                <div className="w-1/2 lg:w-1/3">
                    <Card className="bg-transparent border-none  ">
                        <CardContent className="space-y-1 lg:p-6 p-3">
                            <CardTitle className=" lg:text-2xl text-base">Liên hệ</CardTitle>
                            <CardDescription className=" w-auto lg:text-base text-[11px]">
                                Số điện thoại: 0334740152
                            </CardDescription>
                            <CardDescription className="lg:text-base text-[11px]">
                                Địa chỉ: Số 1 Đại Cồ Việt
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="w-3/4 border border-w-1 h-[1px]" />
            {/*<div>
                <p className="lg:text-base text-xs">Bản quyền thuộc sở hữu của Nhóm 22 - IT4409</p>
            </div>*/}
        </div>
    );
}
