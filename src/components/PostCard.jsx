import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/configurations';

function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full p-4 rounded-xl bg-gray-200'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredimage)} alt={title} className='rounded-xl' />
                    <h4 className='text-lg font-semibold'>{title}</h4>
                </div>
            </div>
        </Link>
    )
}

export default PostCard