import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { BASE_URL } from '../constants'

function Header() {
  const [cookies, , removeCookie] = useCookies()

  function handleLogout(){
    axios.post(`${BASE_URL}/users/logout`).then(res=>{
      alert(res.data.message)
      removeCookie('user')
    })
  }
  return (
    <header className='shadow-sm border-b sticky top-0 opacity-95 z-[100] bg-slate-50'>
        <div className='mx-auto max-w-[1200px] px-6 xl:px-0 flex py-2 items-center '>
            <Link className='flex-1 text-2xl font-semibold' to={'/'}>
              <h2 >NewsApp</h2>
            </Link>
            {/* <div className='px-4 py-1 rounded-full border border-slate-600 mr-5 flex gap-2'>
              <input type="text" name="" id="search" className='bg-slate-50 flex-1 border-none outline-none' placeholder='Search...' />
              <button className='rounded-full w-7 h-7 bg-slate-700 text-slate-50 -mr-2 px-1'>Go</button>
            </div> */}
            {cookies.user && <div className='flex items-center gap-5'>
                <Link className='underline text-slate-600' to={'/add-listing'}>Add Listing</Link>
                <span className='capitalize font-medium'>{cookies.user.name}</span>
                <button type='button' onClick={handleLogout} className='bg-slate-800 text-slate-200 px-3 py-1 font-medium rounded-md'>Logout</button>
            </div>}
            {!cookies?.user && <Link className='bg-slate-800 text-slate-200 px-3 py-1 rounded-md font-medium' to={'/login'}>Login/Register</Link>}
        </div>
    </header>
  )
}

export default Header