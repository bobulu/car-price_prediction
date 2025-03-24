import React,{useEffect,useState} from "react";
import databasesServices from "../../appwrite/configration";
import { Container, PostCard } from "../index";
import PredictionForm from "../postform/PredictionForm.jsx";


  function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        databasesServices.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
      return (
          <div className="w-full py-8 mt-4 text-center">
              <Container>
                  <div className="flex flex-wrap">
                      <div className="p-2 w-full">
                      <div className=" w-full  h-full flex text-center justify-center items-center">
                   <div>
                   <img className="w-96" src="https://w0.peakpx.com/wallpaper/943/675/HD-wallpaper-tata-nexon-crossovers-2020-cars-studio-2020-tata-nexon-indian-cars-tata.jpg" alt="image1" />
                   
                   </div>
                </div>
                          <h1 className="text-2xl font-bold hover:text-gray-500">
                            Wellcome to our Website
                          </h1>
                      </div>
                  </div>
              </Container>
          </div>
      )
  }
  return (
      <div className='w-full py-8'>
          <Container>
              {/* <div className='flex flex-wrap'>
                  {posts.map((post) => (
                      <div key={post.$id} className='p-2 w-1/4'>
                          <PostCard {...post} />
                      </div>
                  ))}
              </div> */}
              <PredictionForm/>
          </Container>
      </div>
  )
}

export default Home;
