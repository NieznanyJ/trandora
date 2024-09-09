"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useWixClient } from "@/hooks/useWixClient"
import { useAppDispatch } from '@/lib/hooks'

import { setIsLoggedIn } from '@/lib/features/cartSlice'

// Move schemas to a separate file if they're used elsewhere
const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const registerFormSchema = loginFormSchema.extend({
  passwordRep: z.string(),
}).refine((data) => data.password === data.passwordRep, {
  message: "Passwords don't match",
  path: ["passwordRep"],
})

type AuthFormProps = {
  type: 'login' | 'register'
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const dispatch = useAppDispatch();
  const wixClient = useWixClient()
  const router = useRouter()

  useEffect(() => {
    if (wixClient.auth.loggedIn()) {
      router.push('/')
    }
  }, [wixClient.auth, router])

  const schema = type === 'login' ? loginFormSchema : registerFormSchema
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === 'register' && { passwordRep: "" }),
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true)
    setSuccess('')
    
    try {
      if (type === 'login') {
        await handleLogin(values.email, values.password)
      } else {
        await handleRegister(values.email, values.password)
      }
    } catch (error) {
      console.error(error)
      setSuccess('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (email: string, password: string) => {
    const response: any = await wixClient.auth.login({ email, password })
    const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken)
    Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), { expires: 4 * 60 * 60 * 1000 })
    wixClient.auth.setTokens(tokens)
    dispatch(setIsLoggedIn(true))
    router.push('/')
  }

  const handleRegister = async (email: string, password: string) => {
    const response = await wixClient.auth.register({ email, password })
    setSuccess(response.loginState === 'SUCCESS' ? 'Registered successfully' : 'Something went wrong')
  }

  const loginDemoAccount = async () => {
    setLoading(true)
    try {
      await handleLogin('demo@demo.com', 'demo1234')
    } catch (error) {
      console.error(error)
      setSuccess('Failed to login with demo account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border-2 border-black rounded-md w-full max-w-[400px]">
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
        {type === 'register' && (
          <FormField
            control={form.control}
            name="passwordRep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Repeat Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {success && <p className="text-sm text-green-600">{success}</p>}
        <Button disabled={loading} type="submit" className='w-full bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>
          {type === 'login' ? 'LOGIN' : 'REGISTER'}
        </Button>
        {type === 'login' && (
          <Button disabled={loading} onClick={loginDemoAccount} type="button" className='w-full bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>
            DEMO ACCOUNT
          </Button>
        )}
        <span className="text-gray-500 text-sm">
          {type === 'login' 
            ? <>Don&apos;t have an account? <Link className="underline" href='/register'>Register</Link></>
            : <>Already have an account? <Link className="underline" href='/login'>Login</Link></>
          }
        </span>
      </form>
    </Form>
  )
}

export default AuthForm