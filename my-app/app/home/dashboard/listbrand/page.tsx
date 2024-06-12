'use client';
import samsung from '../../../../Images/samsung-logo.png';
import huawei from '../../../../Images/Huawei-Logo.png';
import apple from '../../../../Images/apple-logo.png';
import xiaomi from '../../../../Images/xiaomi-logo.png';
import nokia from '../../../../Images/nokia-logo.png';
import oppo from '../../../../Images/Oppo-Logo.wine.png';
import acer from '../../../../Images/Acer-Logo.png';
import asus from '../../../../Images/asus-logo.png';
import dell from '../../../../Images/Dell_Logo.png';
import Hp from '../../../../Images/hp-logo.png';
import { useRouter } from 'next/navigation';

const listBrands = [samsung, huawei, apple, xiaomi, nokia, oppo, acer, asus, dell, Hp];

export default function ListBrand() {
    const router = useRouter();
    return (
        <div className="lg:w-3/4 ml-2 mr-2 border rounded-lg p-3 lg:p-5 grid grid-cols-7 items-center lg:gap-x-4 gap-x-2 lg:gap-y-2">
            <img
                src={samsung.src}
                width={100}
                onClick={() => {
                    localStorage.setItem('brand', 'Samsung');
                    router.push('./view-brand');
                }}
            />
            <img
                src={huawei.src}
                width={105}
                onClick={() => {
                    localStorage.setItem('brand', 'Huawei');
                    router.push('./view-brand');
                }}
            />
            <img
                src={apple.src}
                width={80}
                onClick={() => {
                    localStorage.setItem('brand', 'Apple');
                    router.push('./view-brand');
                }}
            />
            <img
                src={xiaomi.src}
                width={80}
                onClick={() => {
                    localStorage.setItem('brand', 'Xiaomi');
                    router.push('./view-brand');
                }}
            />
            <img
                src={nokia.src}
                width={100}
                onClick={() => {
                    localStorage.setItem('brand', 'Nokia');
                    router.push('./view-brand');
                }}
            />
            <img
                src={oppo.src}
                width={100}
                onClick={() => {
                    localStorage.setItem('brand', 'Oppo');
                    router.push('./view-brand');
                }}
            />
            <img
                src={acer.src}
                width={100}
                onClick={() => {
                    localStorage.setItem('brand', 'Acer');
                    router.push('./view-brand');
                }}
            />
            <img
                src={Hp.src}
                width={80}
                onClick={() => {
                    localStorage.setItem('brand', 'Hp');
                    router.push('./view-brand');
                }}
            />
            <img
                src={dell.src}
                width={100}
                onClick={() => {
                    localStorage.setItem('brand', 'Dell');
                    router.push('./view-brand');
                }}
            />
            <img
                src={asus.src}
                width={100}
                onClick={() => {
                    localStorage.setItem('brand', 'Asus');
                    router.push('./view-brand');
                }}
            />
        </div>
    );
}
