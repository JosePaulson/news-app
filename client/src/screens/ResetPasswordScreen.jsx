import React, { useState } from 'react'
import { BASE_URL } from '../constants'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function ResetPasswordScreen() {
    axios.defaults.withCredentials = true

    const [searchParams] = useSearchParams()
    const [token, tokenTime] = searchParams.get('token').split('^')
    const validToken = (Date.now() - Number(tokenTime)) < 360000 // 3 * 60 * 1000 - 3m converted ot millis

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [message, setMessage] = useState("")

    const [showPass, setShowPass] = useState(false)

    function handleChange(e){
        const {id, value} = e.target
        setFormData(formData=>{
            return {
                ...formData,
                [id]: value.trim()
            }
        })
    }

    function handleReset(){
        document.querySelector('.resetModal').classList.remove('hidden')
    }
    
     function handleAlert(){
        document.querySelector('.alert') && document.querySelector('.alert').classList.add('hidden')
     }

    function handleSubmit(e) {
        e.preventDefault()
        if(confirmPassword === password) {
            axios.post(`${BASE_URL}/users/reset`, {token, password}).then(res=>{
                setMessage(res.data.message)
            }).catch(err=>{
                setMessage(err.response.data.message)
            })
            setFormData(formData=>({}))
        } else {
            document.querySelector('.alert').classList.remove('hidden')
        }
    }

    const { confirmPassword, password } = formData
  return (
    
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-90px)]'>
        {!validToken && <p className='font-medium text-lg text-center'>Oops! This link expired, get <button onClick={handleReset} className='px-3 mt-2 rounded-md font-medium py-1 bg-slate-900 text-slate-50 text-base'>New Link</button></p>}

        {(validToken && !message.includes('loggin in')) && <form onSubmit={handleSubmit} className='px-10 py-6 bg-slate-200 rounded-lg space-y-4 w-[22rem]'>
            <input 
                className='block w-full px-4 py-2 bg-slate-50'
                type={showPass ? 'text' : 'password'}
                placeholder='New Password'
                onChange={handleChange}
                id='password'
                value={password}
                required
                autoComplete='new-password'
                onFocus={handleAlert}
            />

            <div className='relative'>
                <input
                    className='block w-full px-4 py-2 bg-slate-50'
                    type={showPass ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    id='confirmPassword'
                    value={confirmPassword}
                    required
                    autoComplete='new-password'
                    onFocus={handleAlert}
                />
                <span onClick={()=>setShowPass(!showPass)} className='z-4 select-none cursor-pointer absolute uppercase text-[.7rem] top-1/2 -translate-y-1/2 right-2'>show</span>
            </div>
            {(confirmPassword !== password) && <p className='alert hidden'>Passwords don't match</p>}
            <button className='w-full px-6 py-2 bg-slate-800 text-slate-200'>
                Update Password
            </button>
        </form>}
        {message && <p className='font-medium text-lg text-center'>{message.includes('expired') ? 'Sorry, this link expired, refresh and request new link.' : message} {message.includes('logging in') && <button onClick={()=>navigate('/login')} className='px-3 mt-2 rounded-md font-medium py-1 bg-slate-900 text-slate-50 text-base'>Login</button>}</p>}
    </div>
  )
}

export default ResetPasswordScreen