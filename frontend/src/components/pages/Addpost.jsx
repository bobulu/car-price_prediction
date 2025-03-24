import React from 'react'
// import Container from '../container/Container.jsx'
import PredictionForm from '../postform/PredictionForm.jsx'
import {Container} from "../index.js"


const Addpost = () => {
  return (
    <div>
      <div className='py-8'>
        <Container>
      <PredictionForm/>
      </Container>
      </div>
    </div>
  )
}

export default Addpost
