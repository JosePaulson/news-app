import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../constants'

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState()

    function handleClose(){
        document.querySelector('.resetModal').classList.add('hidden')
        setMessage("")
        setEmail("")
    }

    function handleChange(e){
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setMessage("Please Wait...")
        axios.post(`${BASE_URL}/users/reset-link`, {email}).then((res)=>{
            setMessage(res.data.message)
        }).catch((err)=>{
            setMessage(err.response.data.message)
        })
        setEmail("")
    }

  return (
    <div className='resetModal hidden absolute inset-0 bg-slate-950 z-[100] opacity-95 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className='px-8 py-5 bg-slate-50 rounded-md flex flex-col md:flex-row gap-4'>
            <input className='bg-slate-50 py-1.5 outline-none border-b border-slate-900' type="email" onChange={handleChange} id='email' value={email} placeholder='Enter registered email' required />
            <button className='px-4 py-1.5 bg-slate-900 text-slate-50 rounded-md'>Send Reset Link</button>
        </form>
        {message && <div className='text-slate-300 italic text-lg mt-6'>{message}</div>}
        <button type='button' onClick={handleClose} className='text-slate-50 absolute top-5 right-5'>Close</button>
    </div>
  )
}

export default ResetPassword