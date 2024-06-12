'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/config/axios.config';
const SignUpSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Password is too short' })
            .max(20, { message: 'Password is too long' })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/, {
                message:
                    'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
            }),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // path of error
    });

export default function ResetPassword() {
    // ...
    // 1. Define your form.

    const router = useRouter();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        try {
            const { password } = values;
            const email = localStorage.getItem('email') || ' ';
            const resetCode = localStorage.getItem('reset_code') || ' ';
            const temp_token = localStorage.getItem('temp_token') || ' ';
            console.log(JSON.stringify({ resetCode, email, password }));
            const response = await api
                .post(
                    '/auth/forgot-password/reset-password',
                    { resetCode, email, password },
                    { headers: { Authorization: `Bearer ${temp_token}` } },
                )
                .then((data) => {
                    console.log(data.data);
                    localStorage.setItem('access_token', data?.data?.data?.accessToken);
                    localStorage.setItem('refresh_token', data?.data?.data?.refreshToken);
                });
            const response1 = api
                .get('http://localhost:8080/api/v1/user/getUser', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                })
                .then((data) => {
                    localStorage.setItem('user', JSON.stringify(data?.data?.data));
                });
            window.location.replace('/home/dashboard');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className=" w-4/12">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex gap-4"></div>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="***********" type="password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>confirmPassword</FormLabel>
                                        <FormControl>
                                            <Input placeholder="***********" type="password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="flex w-full">
                                Reset
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                {/* <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter> */}
            </Card>
        </div>
    );
}
