import { Inter as FontSans } from 'next/font/google';
import React, { useState } from 'react';

import Sidebar from './sidebar/page';
import Header from './header/page';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-full">
                <Header />
            </div>
            <div className="w-5/6 mx-auto mt-8">
                <Sidebar />
            </div>
            {children};
        </>
    );
}
