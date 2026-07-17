import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//check auth before letting the user access protected routes 








function Index() {

    const Navigate = useNavigate()

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        console.log(import.meta.env.VITE_CLIENT_ID)

        async function getAuthStatus() {
            setLoading(true)
            try {
                let res = await axios.get('http://localhost:3000/auth-status', { withCredentials: true })

                if (res.status == 200 && res.data.msg == 'user found') {
                    setAuth(true)
                    console.log("authenticated")
                }





            } catch (error) {
                if (error.response.status) {
                    setAuth(false)
                    Navigate('/login')
                }
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        getAuthStatus()




    }, [])

    async function removeAuth() {

        let res = await axios.get('http://localhost:3000/api/remove-auth', { withCredentials: true })

        if (res.status == 200 && res.data.msg == 'user no longer exists') {
            Navigate('/login')
        }




    }

    function getHome() {
        Navigate('/home')
    }

    return (!loading && auth ?
        <div>
            {/* Header */}
            <div className='w-full bg-neutral-950/90 backdrop-blur-sm px-6 py-4 text-white flex justify-between items-center border-b border-neutral-800 sticky top-0 z-10'>
                <div
                    onClick={getHome}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer'>
                    Home
                </div>
                <div
                    className='px-4 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer'
                    onClick={removeAuth}>
                    Logout
                </div>
            </div>
            <Outlet />
        </div>

        : <div> loading !! </div>)
}

export { Index }