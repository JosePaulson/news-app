import React, { useState } from 'react'
import { BASE_URL } from '../constants'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function LoginScreen() {
    axios.defaults.withCredentials = true
    const [, setCookie] = useCookies([])
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPass, setShowPass] = useState(false)

    function handleChange(e){
        const {id, value} = e.target
        setFormData(formData=>{
            return {
                ...formData,
                [id]: id==='email' ? value.trim().toLowerCase() : value.trim()
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.post(`${BASE_URL}/users`, {...formData},)
        .then(res=>{
            if(res.data){
                setCookie("user", res.data)
                navigate('/')
            }
        })
        .catch(err=>{alert(err.response?.data?.message)})
    }

    const { email, password } = formData
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-90px)]'>
        <form onSubmit={handleSubmit} className='px-10 py-6 bg-slate-200 rounded-lg space-y-4 w-[22rem]'>
            <input 
                className='block px-4 py-2 bg-slate-50 w-full'
                type='email'
                onFocus={(e)=>e.target.type = 'text'}
                onBlur={(e)=>e.target.type = 'email'} 
                placeholder='Email'
                onChange={handleChange}
                id='email'
                value={email}
                required
            />

            <div className='relative'>
                <input
                    className='block px-4 py-2 bg-slate-50 w-full'
                    type={showPass ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={handleChange}
                    id='password'
                    value={password}
                    required
                />
                <span onClick={()=>setShowPass(!showPass)} className='z-4 select-none cursor-pointer absolute uppercase text-[.7rem] top-1/2 -translate-y-1/2 right-2'>show</span>
            </div>

            <button className='px-6 py-2 bg-slate-800 text-slate-200 w-full'>
                Login
            </button>
            <div className='text-end pr-2'>
                <Link className='tex-lg underline' to={'/register'}>Register</Link>
            </div>
        </form>
    </div>
  )
}

export default LoginScreen