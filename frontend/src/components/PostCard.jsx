import React from 'react'
import databasesServices from "../appwrite/configration";

const PostCard = ({$id ,title ,featureimge}) => {
  return (
   <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4 '></div>
        <img src={databasesServices.getFilesPreview(featureimge)} title={title} />

    </div>
    <h1 className='text-white font-bold'>{title}</h1>
   </Link>
  )
}

export default PostCard
