import React, { useEffect } from 'react'
import './LandingPage.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const LandingPage = () => {
   const navigate = useNavigate()
   useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if(userInfo){
       navigate('/mynote')
      }
     },[navigate])
  return (
    <div className='main' >
            <Container>
               <Row>
                  <Col>
                     <div className='intro-text'>
                      <h1 className='title'>welcome to folly</h1>
                      <p className='subtitle'>one safe play for all your note</p>
                      </div>
                      <div className='buttonContainer'>
                         <Link to='/login'>
                            <Button  size='lg' className='landingbutton'>Login</Button>
                         </Link>
                         <Link to='/register'>
                            <Button size='lg' className='landingbutton' variant='outline-primary'>Register</Button>
                         </Link>
                      </div>
                  </Col>
               </Row>
            </Container>
    </div>
  )
}

export default LandingPage