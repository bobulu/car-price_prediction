import React from 'react'
import { useEffect,useState } from 'react'
import databasesServices from "../../appwrite/configration"
import { PostCard,Container} from "../index";
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post, setpost] = useState([])
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(() => {
        if (slug) {
            databasesServices.getPost(slug).then((post)=>{
                if(post){
                    setpost(post)
                }
            })
        }
        else {
            navigate('/')
        }
        
    }, [slug, navigate]);
  return post? (
    <div className='py-8'>
        <Container>
            <PostCard post={post}/>
        </Container>  
    </div>
  ):null
}

export default EditPost
