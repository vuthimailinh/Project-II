import React, { useEffect } from 'react';

import { Button } from './ui/button';
import axios from 'axios';
import api from '@/config/axios.config';
import { useRouter } from 'next/navigation';

function GoogleSignIn() {
    const router = useRouter();
    function getQueryParams(): { [key: string]: string } {
        const params: { [key: string]: string } = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }

    const googleLogin = async () => {

        try {
            window.open('http://localhost:8080/api/v1/auth/google-auth/google', '_self');
        } catch (error) {
            // Handle error
            console.error('Error during Google login:', error);
        }
    };
    useEffect(() => {
        const params = getQueryParams();
        if (params.user) {
            try {
                const user = JSON.parse(params.user);

                // Save user data to local storage
                localStorage.setItem('user', JSON.stringify(user));
                console.log('User data saved to local storage:', user);

                // Redirect to dashboard
                router.push('http://localhost/3000/home/dashboard');
            } catch (e) {
                console.error('Failed to parse user data:', e);
            }
        }
    }, [router]);

    return (
        <Button className=" w-full" onClick={googleLogin}>
            <svg x="0px" y="0px" className="mr-2 h-4 w-4" viewBox="0 0 30 30">
                <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
            </svg>
            Google
        </Button>
    );
}

export default GoogleSignIn;
