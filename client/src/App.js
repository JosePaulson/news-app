import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { BASE_URL } from './constants'
import { ScrollRestoration } from 'react-router-dom'
import ResetPassword from './components/ResetPassword'

function App() {
  const [cookies, , removeCookie] = useCookies()
  axios.defaults.withCredentials = true
  if(cookies.user){
    axios.post(`${BASE_URL}/users/verify`, {verify: true}).catch(()=>{
      removeCookie('user')
    })
  }
  return (
    <div className='relative'>
      <Header />
      <main className='min-h-[calc(100vh-90px)] px-6 xl:px-0 mx-auto max-w-[1200px]'>
        <Outlet />
      </main>
      <ResetPassword />
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default App