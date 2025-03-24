import React, { useState, useEffect } from 'react'
import databasesServices from "../../appwrite/configration"
import { PostCard, Container } from "../index"; 

const Allpost = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        databasesServices.getPosts()
            .then((response) => {
                if (response && response.documents) {
                    setPosts(response.documents)
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <Container>
                <div className="text-center">Loading posts...</div>
            </Container>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    <div className="text-center">No posts found</div>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full md:w-1/4'> 
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Allpost