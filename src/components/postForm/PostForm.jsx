import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Inputm, RTE, Select } from '../index'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";


function PostForm({ post }) {
  const { register, handleSubmit, watch, getValues, setValues, control } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const navigate = useNavigate();
  const userData = useSelector(state => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })
      if (dbPost) {
        navigate(`post/${dbPost.$id}`)
      }
    }else{
      
    }
  }

  return (
    <div>PostForm</div>
  )
}

export default PostForm