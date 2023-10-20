import React, { useEffect, useState } from 'react'
import Listing from '../components/Listing'
import axios from 'axios'
import { BASE_URL } from '../constants'

function ListingsScreen() {

  const [listings, setListings] = useState([])
  useEffect(()=>{
    axios.get(`${BASE_URL}/listings`).then(res=>setListings(res.data))
  },[])

  return (
    <div className=''>
        {listings.map(listing=>(
          <Listing key={listing._id} {...listing} link />
        ))}
    </div>
  )
}

export default ListingsScreen