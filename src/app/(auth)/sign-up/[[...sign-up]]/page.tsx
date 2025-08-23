"use client";
import React, { useState, useEffect } from 'react';
import SignUpPage from '@/components/auth/SignUp';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import logo from '../../../../../public/logo.svg';

function Page() {  
    const [mounted, setMounted] = useState(false);

    useEffect(() => {   
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex min-h-screen w-full">
            {/* Left side - white background with logo */}
            <div className="flex flex-col items-center justify-center bg-white w-1/3 max-sm:hidden">
                <Image 
                    src={logo} 
                    width={300} 
                    height={300} 
                    alt="Logo" 
                    className="object-contain"
                />
            </div>

            {/* Right side - gradient with sign up */}
            <div className="flex w-2/3 max-sm:w-full 
                bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 
                items-center justify-center">
                <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white p-6">
                    <CardContent>
                        <SignUpPage />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Page;
