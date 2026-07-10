import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'





function Login() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function submitLogin(e) {

        e.preventDefault()
        console.log(email)
        console.log(password)
        setEmail('')
        setPassword('')
    }




    return (
        <div className="min-h-screen flex justify-center items-center w-full bg-neutral-900 p-4">
            <Card className="w-full max-w-sm bg-neutral-900/60 backdrop-blur-xl border border-neutral-700/50 shadow-2xl shadow-black/40">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-neutral-100">
                        Login to your account
                    </CardTitle>
                    <CardDescription className="text-neutral-400">
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" className="text-neutral-300 hover:text-white">
                            Sign Up
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submitLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-neutral-300">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="bg-neutral-800/60 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-neutral-400 focus-visible:border-neutral-500"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}


                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-neutral-300">
                                        Password
                                    </Label>

                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm text-neutral-400 underline-offset-4 hover:text-white hover:underline transition-colors"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="bg-neutral-800/60 border-neutral-700 text-neutral-100 focus-visible:ring-neutral-400 focus-visible:border-neutral-500"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}

                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col bg-neutral-900 gap-2">
                    <Button
                        type="submit"
                        className="w-full bg-white hover:cursor-pointer text-neutral-900 hover:bg-neutral-200 font-medium"
                        onSubmit={submitLogin}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full bg-transparent hover:cursor-pointer border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white"
                    >
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div >
    )
}

export { Login }

