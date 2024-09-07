"use client"

import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { loginFormSchema, registerFormSchema } from "@/lib/formSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

function AuthForm({ type }: { type: string }) {



    return (
        <>
            {type === 'login' ? <LoginForm /> : <RegisterForm />}
        </>
    )

}


function LoginForm() {
    const [loading, setLoading] = useState(false)
    const wixClient = useWixClient()
    const router = useRouter()

    const isLoggedIn = wixClient.auth.loggedIn()


    isLoggedIn && router.push('/')


    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",

        },
    })

    async function loginDemoaccount() {


        try {
            const email = 'demo@demo.com';
            const password = 'demo1234';
            const response: any = await wixClient.auth.login({ email, password })

            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken)
            Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), { expires: 4 * 60 * 60 * 1000 })
            wixClient.auth.setTokens(tokens)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            router.push('/')

        }
    }

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setLoading(true)
        const { email, password } = values
        try {
            const response: any = await wixClient.auth.login({ email, password })

            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken)
            Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), { expires: 4 * 60 * 60 * 1000 })
            wixClient.auth.setTokens(tokens)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            router.push('/')

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border-2 border-black rounded-md w-full max-w-[400px] ">
                <FormField
                    control={form.control}
                    name="email"

                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={loading} className='w-full bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>LOGIN</Button>
                <Button disabled={loading} onClick={loginDemoaccount} className='w-full bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>DEMO ACCOUNT</Button>
                <span className="text-gray-500 text-sm">Don&apos;t have an account ? <Link className="underline" href='/register'>Register</Link></span>
            </form>
        </Form>


    );
}


function RegisterForm() {
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordRep: ""

        },
    })

    const wixClient = useWixClient()

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        setLoading(true)

        const { email, password } = values

        try {
            const response = await wixClient.auth.register({ email, password })
            console.log(response)
            setSuccess(response.loginState === 'SUCCESS' ? 'Registered succesfully' : 'Something went wrong')

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border-2 border-black rounded-md w-full max-w-[400px] ">
                <FormField
                    control={form.control}
                    name="email"

                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordRep"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repeat password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {success && <p className="text-sm "> {success} </p>}
                <Button disabled={loading} className='w-full bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>REGISTER</Button>
                <span className="text-gray-500 text-sm">Already have an account ? <Link className="underline" href='/login'>Login</Link></span>
            </form>
        </Form>

    );
}

export default AuthForm