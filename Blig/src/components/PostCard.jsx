import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

// ye card functionality dene wala component hai
function PostCard({
    $id,     // appwrite me id ko $id ki trh likha jata h ye appwrite ka syntax hai, to ise id variable ki trh suppose krna, ye us blog ki individual id rhegi
    title,    // title of the blog
    featuredImage,  // image of that blog
}) {
  return (

    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.filePreview(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>

  )
}

export default PostCard

// Note: Link mei jo url dete hai vo hume ab hum jis url pe hai uske baad ka url accept krta hai