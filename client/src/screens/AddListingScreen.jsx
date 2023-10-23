import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
function AddListingScreen() {
    const [cookies] = useCookies()
    const {state} = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        headline: "",
        subHeading: "",
        reporter: cookies?.user?.name,
        content: "",
    })
    const [image, setImage] = useState()

    useEffect(()=>{
        if(state?.action === 'edit'){
            axios.get(`${BASE_URL}/listings/${state?.id}`)
            .then(res=>{
                setFormData(
                    {
                        headline: res.data.headline,
                        subHeading: res.data.subHeading,
                        reporter: res.data.reporter,
                        content: res.data.content,
                    }
                )
                let img = document.querySelector('img')
                img.src = res.data.img
            })
        }
    },[state?.action, state?.id])

    function handleChange(e){
        const {id, value} = e.target
        setFormData(formData=>(
            {
                ...formData,
                [id] : value
            }
        ))
    }

    
    function handleSubmit(e){
        axios.defaults.withCredentials = true
        e.preventDefault()
        const multiData = new FormData()
        for( let key in formData) {
            multiData.append(key, formData[key])
        }
        multiData.append('file', image)
        if(state?.action === 'edit') {
            axios.put(`${BASE_URL}/listings/${state.id}`, multiData).then(()=>navigate(`/`)).catch(err=>alert(err.response.data.message))
        } else {
            multiData.append('reporterId', cookies.user._id)
            axios.post(`${BASE_URL}/listings`, multiData).then(()=>navigate('/')).catch(err=>alert(err.response.data.message))
        }
        setFormData({})
    }
    
    let {headline, subHeading, reporter, content} = formData

    return (
        <div className='my-8'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <img className='w-32 rounded-md' src='https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png' alt="" />
                <div className='flex items-center gap-4 italic'>
                    <label htmlFor="image">Add an image file</label>
                    <input
                        className=''
                        type='file'
                        id='image'
                        onChange={(e)=>{
                            setImage(e.target.files.length && e.target.files[0])
                            let img = document.querySelector('img')
                            img.src = window.URL.createObjectURL((e.target.files.length !== 0) && e.target.files[0])
                        }}
                        required={!state?.action}
                    />
                </div>
                <input
                    className='px-4 py-2 border rounded-md border-slate-600 bg-slate-50'
                    type='text'
                    placeholder='Headline'
                    id='headline'
                    onChange={handleChange}
                    value={headline}
                    required
                />
                <input
                    className='px-4 py-2 border rounded-md border-slate-600 bg-slate-50'
                    type='text'
                    placeholder='Sub Heading'
                    id='subHeading'
                    onChange={handleChange}
                    value={subHeading}
                    required
                />
                <input
                    className='px-4 py-2 capitalize border rounded-md border-slate-600 bg-slate-50'
                    type='text'
                    placeholder='Reporter'
                    id='reporter'
                    onChange={handleChange}
                    value={reporter}
                    required
                />
                <textarea
                    className='px-4 py-2 border rounded-md h-contain border-slate-600 bg-slate-50' type='text'
                    placeholder='Content'
                    rows={10}
                    id='content'
                    onChange={handleChange}
                    value={content}
                    required
                />
                <button className='uppercase px-6 py-2.5 font-semibold bg-slate-800 text-slate-200 rounded-md' type='submit'>{state?.action ? 'Update' : 'Add'} &nbsp;Listing</button>
            </form>
        </div>
    )
}

export default AddListingScreen