import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthRoute = () => {
    const [cookies] = useCookies()
  return (
    cookies.user ? <Outlet /> : <Navigate to={'/login'} replace/>
  )
}

export default AuthRoute