import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../constants'
import Listing from '../components/Listing'
import { useCookies } from 'react-cookie'

const ListingScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies()
  const [listing, setListing] = useState('')
  useEffect(()=>{
    axios.get(`${BASE_URL}/listings/${id}`).then(res=>setListing(res.data)).catch(()=>{
      alert('Not found')
      navigate('/')
    })
  },[id, navigate])

  function handleDelete(){
    axios.delete(`${BASE_URL}/listings/${id}`, {withCredentials: true})
    .then(()=>{
      navigate('/')
    })
  }

  return (
    <div >
      {(cookies.user && (cookies.user._id === listing.reporterId)) && <div className='flex gap-2 justify-end pt-4'>
        <Link to={'/add-listing'} state={{action: 'edit', id}} className='px-5 py-1.5 bg-slate-800 text-slate-200 rounded-md font-medium'>Edit</Link>
        <button onClick={handleDelete} className='px-5 py-1.5 bg-slate-800 text-slate-200 rounded-md font-medium'>Delete</button>
      </div>}
      {listing && <Listing {...listing} />}
      <div className='text-justify my-10 border-t border-slate-400 pt-7'>
        <p className='text-lg md:text-xl indent-4 text-slate-700'>{listing.content}</p>
      </div>
    </div>
  )
}

export default ListingScreen