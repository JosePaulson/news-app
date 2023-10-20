import React from 'react'
import { Link } from 'react-router-dom'

function Listing({img, headline, subHeading, reporter='NA', _id, link, createdAt}) {
  return (
    <div className='flex flex-col-reverse md:flex-row gap-4 md:gap-8 justify-center my-8'>
        <div className={`${link && 'md:w-2/5'} md:self-end`}>
            <h3 className='text-xl md:text-3xl font-bold mb-2 md:mb-6'>{headline}</h3>
            <p className='text-base md:text-xl'>{subHeading}</p>
            {link && <Link to={`/${_id}`} className='px-6 inline-block mt-4 py-2 bg-slate-800 text-slate-200'>Read More...</Link>}
            {!link && <div className='mt-4'>
              <h5 className='text-[1.05rem] font-medium text-slate-600'>Reporter: {reporter}</h5>
              <span className='text-slate-800'>{new Date(createdAt).toDateString()} IST</span>
            </div>}
        </div>
        <img className='md:w-2/5' loading='lazy' decoding='async' src={img} alt="" />
    </div>
  )
}

export default Listing