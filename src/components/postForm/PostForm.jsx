import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/configurations";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, getValues, setValue, control, formState: { errors } } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const addDebugInfo = (info) => {
    console.log("DEBUG:", info);
    setDebugInfo(prev => prev + "\n" + info);
  };

  const submit = async (data) => {
    setFormError("");
    setDebugInfo("");
    setIsSubmitting(true);
    
    try {
      addDebugInfo("=== FORM SUBMISSION STARTED ===");
      addDebugInfo(`Form data: ${JSON.stringify(data, null, 2)}`);
      addDebugInfo(`User data: ${JSON.stringify(userData, null, 2)}`);
      addDebugInfo(`Post data: ${JSON.stringify(post, null, 2)}`);

      // Validation checks
      if (!data.title?.trim()) {
        throw new Error("Title is required and cannot be empty");
      }
      
      if (!data.slug?.trim()) {
        throw new Error("Slug is required and cannot be empty");
      }
      
      if (!data.content?.trim()) {
        throw new Error("Content is required and cannot be empty");
      }
      
      if (!userData?.$id) {
        throw new Error("User not authenticated. Please login again.");
      }

      const imageFiles = getValues("image");
      addDebugInfo(`Image files: ${imageFiles ? imageFiles.length : 0} files`);
      
      if (!post && (!imageFiles || !imageFiles[0])) {
        throw new Error("Featured image is required for new posts");
      }

      if (post) {
        addDebugInfo("=== UPDATING EXISTING POST ===");
        
        let fileId = post.featuredimage;
        
        // Handle image upload if new image provided
        if (imageFiles && imageFiles[0]) {
          addDebugInfo("Uploading new image...");
          const file = await appwriteService.uploadFile(imageFiles[0]);
          addDebugInfo(`New file uploaded: ${JSON.stringify(file, null, 2)}`);
          
          if (file) {
            // Delete old image
            addDebugInfo(`Deleting old image: ${post.featuredimage}`);
            await appwriteService.deleteFile(post.featuredimage);
            fileId = file.$id;
          }
        }

        const updateData = {
          title: data.title.trim(),
          content: data.content.trim(),
          featuredimage: fileId,
          status: data.status,
        };
        
        addDebugInfo(`Update data: ${JSON.stringify(updateData, null, 2)}`);
        
        const dbPost = await appwriteService.updatePost(post.$id, updateData);
        addDebugInfo(`Updated post: ${JSON.stringify(dbPost, null, 2)}`);
        
        if (dbPost) {
          addDebugInfo("Post updated successfully!");
          navigate(`/post/${dbPost.$id}`);
        } else {
          throw new Error("Failed to update post - no response from database");
        }
        
      } else {
        addDebugInfo("=== CREATING NEW POST ===");
        
        // Upload image
        addDebugInfo("Uploading image...");
        const file = await appwriteService.uploadFile(imageFiles[0]);
        addDebugInfo(`File upload result: ${JSON.stringify(file, null, 2)}`);
        
        if (!file || !file.$id) {
          throw new Error("Image upload failed - no file ID returned");
        }

        const createData = {
          title: data.title.trim(),
          slug: data.slug.trim(),
          content: data.content.trim(),
          featuredimage: file.$id,
          status: data.status,
          userId: userData.$id,
        };
        
        addDebugInfo(`Create data: ${JSON.stringify(createData, null, 2)}`);
        
        const dbPost = await appwriteService.createPost(createData);
        addDebugInfo(`Created post: ${JSON.stringify(dbPost, null, 2)}`);
        
        if (dbPost) {
          addDebugInfo("Post created successfully!");
          navigate(`/post/${dbPost.$id}`);
        } else {
          throw new Error("Failed to create post - no response from database");
        }
      }
      
    } catch (error) {
      addDebugInfo(`ERROR: ${error.message}`);
      addDebugInfo(`Error stack: ${error.stack}`);
      console.error("PostForm Error:", error);
      setFormError(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const transformed = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      addDebugInfo(`Slug transformed: "${value}" -> "${transformed}"`);
      return transformed;
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug = slugTransform(value.title);
        setValue("slug", newSlug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {post ? "Edit Post" : "Create New Post"}
      </h1>
      
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
        <div className="w-full lg:w-2/3">
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <h4 className="font-semibold mb-2">Error:</h4>
              <p>{formError}</p>
            </div>
          )}

          {debugInfo && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">Debug Information:</h4>
              <pre className="text-xs overflow-auto max-h-40 whitespace-pre-wrap">
                {debugInfo}
              </pre>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <Input
                label="Title *"
                placeholder="Enter post title"
                className={errors.title ? "border-red-500" : ""}
                {...register("title", { 
                  required: "Title is required",
                  minLength: { value: 3, message: "Title must be at least 3 characters" }
                })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Input
                label="Slug *"
                placeholder="post-slug"
                className={errors.slug ? "border-red-500" : ""}
                {...register("slug", { 
                  required: "Slug is required",
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: "Slug can only contain lowercase letters, numbers, and hyphens"
                  }
                })}
                onInput={(e) => {
                  const transformed = slugTransform(e.currentTarget.value);
                  setValue("slug", transformed, { shouldValidate: true });
                }}
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <RTE
                label="Content *"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="space-y-6">
            <div>
              <Input
                label={`Featured Image ${!post ? '*' : ''}`}
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                className={errors.image ? "border-red-500" : ""}
                {...register("image", { 
                  required: !post ? "Featured image is required" : false,
                  validate: {
                    fileSize: (files) => {
                      if (!files || !files[0]) return true;
                      return files[0].size <= 5000000 || "File size must be less than 5MB";
                    },
                    fileType: (files) => {
                      if (!files || !files[0]) return true;
                      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                      return allowedTypes.includes(files[0].type) || "Only image files are allowed";
                    }
                  }
                })}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            {post && post.featuredimage && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Image
                </label>
                <img
                  src={appwriteService.getFilePreview(post.featuredimage)}
                  alt={post.title}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            <div>
              <Select
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" }
                ]}
                label="Status *"
                className={errors.status ? "border-red-500" : ""}
                {...register("status", { required: "Status is required" })}
              />
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              bgColor={post ? "bg-green-600" : "bg-blue-600"}
              className={`w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {post ? "Updating..." : "Creating..."}
                </div>
              ) : (
                post ? "Update Post" : "Create Post"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;