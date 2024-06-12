'use client';
import { SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import api from '@/config/axios.config';

export default function CodeForReset() {
    const [code, setCode] = useState(' ');
    const email = localStorage.getItem('email');
    const router = useRouter();
    const handleSendCode = async () => {
        console.log(email, code);
        const response = await api.post('/auth/verifyResetCode', { email:email, resetCode:code }).then((data) => {
            console.log(data.data);
            localStorage.setItem('temp_token', data?.data?.data?.tempToken);
        });

        console.log('Success get temp token:');
        localStorage.setItem('reset_code', code);
        router.push('/auth/reset_password');
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Validate User</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Enter code for validation</Label>
                        </div>
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(value: SetStateAction<string>) => {
                                setCode(value);
                            }}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSendCode}>Send code</Button>
            </CardFooter>
        </Card>
    );
}
