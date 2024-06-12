'use client';
import NewMenubarMenu from '@/app/home/dashboard/menubar/page';
import { Menubar, MenubarMenu, MenubarShortcut } from '@/components/ui/menubar';
import { MenubarTrigger } from '@/components/ui/menubar';
import { SquareUser, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import StaffItem from './staff/page';
import { IUser } from '../../../../back-end/src/models/User.model';
import axios from 'axios';

export default function ManageStaff() {
    //localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ2Y2QwYjU1NDczMDljMDAxMGNkYTQiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJpYXQiOjE3MTY0NjAzNzR9.WlzBBJ4yovP01iVOe-R_ZefzfEXaFPLVXUxHBJpvXrk');

    const [staffs, setStaffs] = useState<IUser[]>([]);
    const [roleFilter, setRoleFilter] = useState('all');

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });

    const fetchStaffs = async (type: string): Promise<IUser[]> => {
        try {
            const response = await axiosInstance.get(`/admin/list/${type}`);
            console.log(response.data.data.listApply);

            return response.data.data.list as IUser[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(`Error fetching staff data: ${error.response.status} - ${error.response.statusText}`);
            } else {
                console.error('Error fetching staff data:', error);
            }
            throw error; // Re-throw the error to be handled by the caller
        }
    };

    useEffect(() => {
        const getStaffs = async () => {
            const staffs = await fetchStaffs(roleFilter);
            setStaffs(staffs);
        };
        getStaffs();
    }, [roleFilter]);


    return (
        <div className='w-full'>
            <div className="flex h-12 justify-start items-center border border-y w-full mt-8">
                <div className="flex">
                    <Menubar className="border-none">
                        <MenubarMenu>
                            <div className="flex gap-16 ml-56">
                                <MenubarTrigger onClick={() => setRoleFilter('all')}>Tất cả</MenubarTrigger>

                                <MenubarTrigger onClick={() => setRoleFilter('staff')}>
                                    <MenubarShortcut>
                                        <SquareUser />
                                    </MenubarShortcut>{' '}
                                    Staff
                                </MenubarTrigger>

                                <MenubarTrigger onClick={() => setRoleFilter('deliver')}>
                                    <MenubarShortcut>
                                        <Truck />
                                    </MenubarShortcut>{' '}
                                    Deliver
                                </MenubarTrigger>
                            </div>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
            <div className="flex flex-row gap-16 content-center ml-8 mx-auto">
                    {staffs.map((staff) => (
                        <StaffItem key={staff._id} staff={staff} />
                    ))}
                </div>
        </div>
    );
}