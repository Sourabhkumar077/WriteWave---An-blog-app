import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/configurations';

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className="w-full h-full p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col justify-between">
        <div className="w-full flex flex-col items-center mb-4">
          <div className="w-full aspect-video overflow-hidden rounded-xl mb-2 bg-gray-100">
            <img
              src={appwriteService.getFilePreview(featuredimage)}
              alt={title}
              className="object-cover w-full h-full rounded-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">{title}</h4>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;