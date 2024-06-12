'use client';
import * as React from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import GoogleSignIn from '@/components/google-login';
import { Button } from '@/components/ui/button';
// Định nghĩa kiểu dữ liệu cho user
type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
};

const initialUser: User = {
    id: 'm5gr84i9',
    name: 'xxxxxx',
    email: 'ken99@yahoo.com',
    phone: '0123456789',
    role: 'user',
    address: 'Số 4, Đường Bến, Xóm 3 Đồng Nhân Xã Đông La, Huyện Hoài Đức, Hà Nội',
};

export default function Profile() {
    // Sử dụng useForm hook để tạo ra form
    const form = useForm<User>({
        resolver: zodResolver(
            z.object({
                name: z.string(),
                email: z.string().email(),
                phone: z.string(),
                role: z.string(),
            }),
        ),
        defaultValues: initialUser, // Sử dụng giá trị mặc định cho form từ initialUser
    });

    return (
        <div>
            <div className="border-1 shadow-lg h-auto rounded-lg">
                {/* top content */}
                <Card className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
                    <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                        <img src="https://media.licdn.com/dms/image/C4D03AQH8qidO0nb_Ng/profile-displayphoto-shrink_800_800/0/1615696897070?e=2147483647&v=beta&t=ia3wfE2J7kVLdBy9ttkgUDAA_ul29fymykhQo0lABDo" />
                    </div>

                    <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                        <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">Shopee</p>
                    </div>
                </Card>

                {/* <!-- main content --> */}
                <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:mt-10">
                        <div className="flex flex-col basis-1/3">
                            {/* <!-- My contact --> */}
                            <div className="py-3 sm:order-none order-3">
                                <CardTitle className="text-lg font-poppins font-bold text-top-color">
                                    {initialUser.name}
                                </CardTitle>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <div>
                                    <div className="flex items-center my-1">
                                        <a className="w-6  hover:text-orange-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                className="h-4"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                                ></path>
                                            </svg>
                                        </a>
                                        <div className="ml-2 truncate">{initialUser.email}</div>
                                    </div>
                                    <div className="flex items-center my-1">
                                        <a
                                            className="w-6  hover:text-orange-600"
                                            aria-label="Visit TrendyMinds YouTube"
                                            href=""
                                            target="_blank"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                                className="h-4"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                                                ></path>
                                            </svg>
                                        </a>
                                        <div>{initialUser.phone}</div>
                                    </div>
                                    <div className="flex items-center my-1">
                                        <a
                                            className="w-6  hover:text-orange-600"
                                            aria-label="Visit TrendyMinds Facebook"
                                            href=""
                                            target="_blank"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                                className="h-4"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                                ></path>
                                            </svg>
                                        </a>
                                        <div>sale galli latur</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Địa chỉ --> */}
                            <div className="py-3 sm:order-none order-2">
                                <h2 className="text-lg font-poppins font-bold text-top-color">Địa chỉ</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <p>{initialUser.address}</p>
                            </div>
                            {/* <!-- Đơn mua --> */}
                            <div className="py-3 sm:order-none order-1">
                                <h2 className="text-lg font-poppins font-bold text-top-color">Đơn mua</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>
                            </div>
                        </div>

                        <div className="flex flex-col basis-1/3 order-first sm:order-none sm:-mt-10">
                            {/* <!-- Hồ sơ của tôi --> */}
                            <div className="py-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">Hồ sơ của tôi</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>
                                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            </div>

                            {/* <!-- Sửa hồ sơ --> */}
                            <div className="py-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">
                                    Professional Experience
                                </h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <p className="text-lg font-bold ">Tên đăng nhập</p>
                                        <Input value={initialUser.name} className="max-w-sm" />
                                    </div>

                                    <div className="flex flex-col mt-8">
                                        <p className="text-lg font-bold ">Tên</p>
                                        <Input value={initialUser.name} className="max-w-sm" />
                                    </div>
                                    <div className="flex flex-col mt-8">
                                        <p className="text-lg font-bold ">Email</p>
                                        <Input value={initialUser.email} className="max-w-sm" />
                                    </div>
                                    <div className="flex flex-col mt-8">
                                        <p className="text-lg font-bold text-gray-700">Số điện thoại</p>
                                        <Input value={initialUser.phone} className="max-w-sm" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col basis-1/3 order-first sm:order-none sm:-mt-10">
                                <div className="flex flex-col mt-8">
                                    <p className="text-lg font-bold text-gray-700">Giới tính</p>
                                    <div className="flex flex-row">
                                        <Label>
                                            <Checkbox
                                                value="male"
                                                //   checked={gender === "male"}
                                                //   onChange={handleGenderChange}
                                            />
                                            <span className="ml-2">Nam</span>
                                        </Label>
                                        <br />
                                        <Label>
                                            <Checkbox
                                                value="female"
                                                //   checked={gender === "female"}
                                                //   onChange={handleGenderChange}
                                            />
                                            <span className="ml-2">Nữ</span>
                                        </Label>
                                        <br />
                                        <Label>
                                            <Checkbox
                                                value="other"
                                                //   checked={gender === "other"}
                                                //   onChange={handleGenderChange}
                                            />
                                            <span className="ml-2">Khác</span>
                                        </Label>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <p className="text-lg font-bold text-gray-700">Ngày sinh</p>
                                    <div className="flex flex-row">
                                        <Label htmlFor="dob">Ngày sinh:</Label>
                                        <Input type="date" id="dob" name="dob" />
                                        <Input type="submit" value="Submit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
