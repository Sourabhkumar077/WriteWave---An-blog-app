import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/configurations";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        Title: post?.Title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [formError, setFormError] = useState("");

  const submit = async (data) => {
    setFormError("");
    const imageFiles = getValues("image");
    if (
      !data.Title ||
      !data.slug ||
      !data.content ||
      !userData?.$id ||
      (!post && (!imageFiles || !imageFiles[0]))
    ) {
      setFormError("All fields including image are required.");
      return;
    }
    if (!data.status) {
      setFormError("Status is required.");
      return;
    }
    try {
      if (post) {
        const file =
          imageFiles && imageFiles[0]
            ? await appwriteService.uploadFile(imageFiles[0])
            : null;
        if (file) {
          appwriteService.deleteFile(post.featuredimage);
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          Title: data.Title,
          content: data.content,
          featuredimage: file ? file.$id : post.featuredimage,
          status: data.status,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        } else {
          setFormError(
            "Failed to update post. Please check your input and try again."
          );
        }
      } else {
        if (!imageFiles || !imageFiles[0]) {
          setFormError("All fields including image are required.");
          return;
        }
        const file = await appwriteService.uploadFile(imageFiles[0]);
        if (!file) {
          setFormError("Image upload failed. Please try again.");
          return;
        }
        const fileId = file.$id;
        const dbPost = await appwriteService.createPost({
          Title: data.Title,
          slug: data.slug,
          content: data.content,
          featuredimage: fileId,
          status: data.status,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        } else {
          setFormError(
            "Failed to create post. Please check your input and try again."
          );
        }
      }
    } catch (err) {
      setFormError(err?.message || "An error occurred. Please try again.");
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "Title") {
        setValue("slug", slugTransform(value.Title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-semibold">
            {formError}
          </div>
        )}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("Title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.Title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
