import React,{useCallback} from 'react'
import {set, useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) {
    // useform hume register or handle submit ke sath sath watch attribute bhi deta hai jisse hum kisi bhi field ko continously watch kr skte hai.
    // sath mei form ki kisi value ko set krna ho to setValue attribute or ek control bhi deta hai jise bhi RTE mei pass krenge jis s uska control parent ko mil paega
    // sath mei ek getValues attribute jis se form ki kisi field ki value chahiye hoti hai to getValues() se vo le skte hai
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues : {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }

    });

    const navigate = useNavigate();

    const userData = useSelector((state) => state.user.userData);

    // agr user ne data submit krdiya h to kya kre
    const submit = async(data) => {
        // agr post phele se hi ho to kya krna h 
        if(post){
            // agr post h to check krenge image h ya nhi agr image hogi to use appwrite ki service ki help se upload krva lenge
           const file = data.image[0] ? service.uploadFile(data.image[0]) : null
        
           // pichle wali image ko delete krvado
           if(file){
            service.deleteFile(post.featuredImage)
           }

           // 
           const dbPost = await service.updatePost(post.$id,{...data,
                                                            featuredImage: file ? file.$id : undefined
                                                            });
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // agr post phle se nhi ho to, yha nya form create krna hai
            const file = await data.image[0] ? service.uploadFile(data.image[0]) : null
            
            // agr file upload hogya hai to 
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }

        }

        
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
                   .trim()
                   .toLowerCase()
                   .replace(/^[a-zA-Z\d\s]+/g,'-')
                   .replace(/\s/g,'-')
        }
        // agr value nhi h to empty string return krdo
        return ''
    },[])

    React.useEffect(() => {
        const subscription = watch((value,{name}) => {
            if (name === 'title'){
                setValue('slug',slugTransform(value.title,{shouldValidate : true}))
            }
        })


        return () => {
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])
      return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
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
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
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
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
        )
}

export default PostForm