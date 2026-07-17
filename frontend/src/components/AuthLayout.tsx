import React from 'react'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'


function AuthLayout() {

    const [check, setCheck] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {

        setCheck(true)

        async function getAuth() {
            console.log("reached!")
            try {
                let res = await axios.get('http://localhost:3000/auth-status', { withCredentials: true })
                console.log(res)
                if (res) {
                    navigate('http://localhost:5173/')
                } else {
                    setCheck(false)
                }
            } catch (error) {
                console.log(error)
            }


        }

        getAuth()






    }, [])



    if (check) { return <div className='text-black'> loading !!</div> } //getting the user info from backend 
    else {
        return <div> <Outlet />  </div>
    }
}

export { AuthLayout }