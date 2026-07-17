import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {


    const Navigate = useNavigate()



    async function doAuth(cred: object) {


        type cred = {
            credential: string,
            client_id: string,
            select_by: string
        }

        console.log(cred)
        try {

            let res = await axios.post('http://localhost:3000/api/auth/login',
                {
                    token: cred.credential
                },
                {
                    withCredentials: true
                }
            )

            console.log(res)

            if (res.status == 200 && res.data.msg == 'already user exists') {
                Navigate('/')
            }

        } catch (error) {
            console.log(error)
        }



    }










    return (
        <div className='flex items-center justify-center h-screen bg-neutral-950 relative overflow-hidden'>

            {/* Ambient background glow */}
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl' />

            <div className='relative w-full max-w-sm mx-4 p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl'>
                <p className='text-3xl font-bold text-white text-center mb-1'>Welcome back</p>
                <p className='text-sm text-neutral-400 text-center mb-8'>Sign in to continue to your dashboard</p>

                <div className='flex justify-center'>
                    <GoogleLogin
                        onSuccess={doAuth}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>

        </div>
    )
}

export { Login }