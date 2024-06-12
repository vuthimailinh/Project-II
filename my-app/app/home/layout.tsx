import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ModeToggle } from '@/components/theme-button';
import Footer from '../footer/page';
import Navbar from '@/components/Navbar';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children};
            <Footer />
        </>
    );
}
