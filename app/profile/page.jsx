"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile';

const MyProfile = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const resposne = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await resposne.json();
            console.log("Posts data is here in the Profile =", data);
            setPosts(data);
        }
        console.log("Session in profile", session);
        if (session?.user?.id) {
            fetchPosts();
        }
    }, [session]);

    console.log("Session in profile 3", session);

    const handleEdit = (post) => {
        console.log("Edit the post",post._id);
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        console.log("DELETE the post")
        const hasConfirmed = confirm("Are You want To delete the Prompt")

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p)=>p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center mx-auto">
                <Profile
                    name="My"
                    desc="Welcome to your personalized profile page"
                    data={posts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </>
    )
}

export default MyProfile;
