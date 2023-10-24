import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { BASE_URL } from '../constants'

function Header() {
  const [cookies, , removeCookie] = useCookies()
  const navigate = useNavigate()

  function handleLogout(){
    axios.post(`${BASE_URL}/users/logout`).then(res=>{
      removeCookie('user')
      navigate('/login')
    })
  }

  function toggleMenu(){
    const menu = document.querySelector('.menu')
    menu.classList.toggle('hidden')
  }

  useEffect(()=>{
    const body = document.querySelector('body')
    const menu = document.querySelector('.menu')
    const toggler = document.querySelector('.toggler')

    body.addEventListener('click', (e)=>{
      if(!menu.contains(e.target) && !toggler.contains(e.target)){
          menu.classList.add('hidden')
      }
    })
  },[])

  return (
    <header className='shadow-sm border-b sticky top-0 opacity-90 z-[100] bg-slate-50'>
        <div className='mx-auto max-w-[1200px] px-4 xl:px-0 flex py-2 items-center '>
            <Link className='flex-1 text-[1.3rem] sm:text-2xl font-semibold' to={'/'}>
              <h2 >NewsApp</h2>
            </Link>
            <div className='hidden search absolute top-2 left-3 right-3 flex gap-2 justify-center items-center bg-slate-50'>
              <div className='flex gap-2 px-4 py-1 border rounded-full border-slate-600'>
                <input type="text" name="" id="search" className='flex-1 border-none outline-none bg-slate-50' placeholder='Search...' />
                <button className='px-1 -mr-2 rounded-full w-7 h-7 bg-slate-700 text-slate-50'>Go</button>
              </div>
              <span className='cursor-pointer' onClick={()=>document.querySelector('.search').classList.add('hidden')}>Close</span>
            </div>
            <span className='cursor-pointer mr-2 md:mr-4' onClick={()=>document.querySelector('.search').classList.toggle('hidden')}>Search</span>
            {cookies.user && <div className='flex items-center gap-5'>
                <Link className='underline text-slate-600' to={'/add-listing'}>Add Listing</Link>
                <div onMouseOver={()=>{document.querySelector('.userMenu').classList.remove('hidden')}} onMouseOut={()=>{document.querySelector('.userMenu').classList.add('hidden')}} className='cursor-pointer -mb-[1px] relative hidden font-medium capitalize md:block'>{cookies.user.name}
                <div className='hidden top-full pt-2.5 userMenu absolute z-[50] rounded-md'>
                    <div className='px-4 py-1.5 bg-slate-200 text-black font-medium rounded-md text-base w-[7rem] flex flex-col gap-1'>
                      <Link>Listings</Link>
                      <Link>Profile</Link>
                    </div>
                </div>
                </div>
                <button type='button' onClick={handleLogout} className='hidden px-3 py-1 font-medium rounded-md md:block bg-slate-800 text-slate-200'>Logout</button>
            </div>}
            {!cookies?.user && <Link className='hidden md:block px-3 py-1 font-medium rounded-md bg-slate-800 text-slate-200' to={'/login'}>Login/Register</Link>}
            <div onClick={toggleMenu} className='cursor-pointer ml-3 toggler flex flex-col justify-center gap-1 p-1 border rounded-full md:hidden border-slate-950'>
              <span className='w-[2px] h-[2px] bg-slate-950'></span>
              <span className='w-[2px] h-[2px] bg-slate-950'></span>
              <span className='w-[2px] h-[2px] bg-slate-950'></span>
            </div>
        </div>
        <div className='hidden menu absolute z-[50] rounded-md right-2 bg-slate-200'>
          {cookies.user && <div className='px-4 py-2'>
            <div className='flex flex-col gap-1'>
              <span className='font-medium capitalize md:hidden'>{cookies.user?.name}</span>
              <Link className='text-end'>My Listings</Link>
              </div>
          </div>}
          {cookies.user && <button type='button' onClick={()=>{handleLogout(); document.querySelector('.menu').classList.add('hidden') }} className='w-full px-3 py-1.5 font-medium rounded-b-md md:hidden bg-slate-800 text-slate-200'>Logout</button>}
          {!cookies?.user && <Link onClick={()=>document.querySelector('.menu').classList.add('hidden')} className=' md:hidden px-2.5 py-1 font-medium rounded-md bg-slate-800 text-slate-200' to={'/login'}>Login/Register</Link>}
        </div>
    </header>
  )
}

export default Header