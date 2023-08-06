import React, { useState } from 'react';
import Mainscreen from '../component/MainScreen';
import { Button,Form, Row } from 'react-bootstrap';
import {Link, Navigate, redirect, useNavigate} from 'react-router-dom'
import ErrorMessage from '../component/ErrorMessage';
import axios from 'axios'
import { register } from '../actions/userAction'
// import { useDispatch, useSelector } from 'react-redux'
import Loading from '../component/Loading';

const Register = () => {
  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [comfirmPassword,setcomfirmPassword]=useState('')
  const [message,setMessage]=useState(null)
  const [picMessage,setPicMessage]=useState(null)
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)

  const [pic,setPic]=useState('https:icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')
 
  //  const dispatch = useDispatch() //!using redux
  //  const userRegister = useSelector((state)=> state.userRegister)  //!using redux
  const submitHandler = async(e)=>{
    e.preventDefault()

    // if(password ! == comfirmPassword){
    //   setMessage('password do not match')
    // }else{
    //   dispatch(register(name,email,password,pic))
    // }
    if(password !== comfirmPassword){
      setMessage('password does not match')
    }else{
      setMessage(null)
      try {
        const config ={
          headers:{
            "Content-type":"application/json"
          }
        }
        setLoading(true)
        const {data} = await axios.post('http://localhost:5000/api/user',{name,pic,email,password},config)
    localStorage.setItem('userInfo',JSON.stringify(data))
    console.log(data)
    setLoading(false)
    navigate('/mynote', { replace: true });
        
      } catch (error) {
        setError(error.response.data.message)
      }
    }
  }
  const postDeatails =(pics)=>{
    if(!pics){
      return setPicMessage('please select pics')
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData()
      data.append("file",pics)
      data.append("upload_preset","follyb")
      data.append("cloud_name","folly")
      fetch('https://api.cloudinary.com/v1_1/folly/image/upload',{
        method:'post',
        body:data
      }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        setPic(data.url.toString())
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      return setPicMessage('please select an image')
    }
  }
  return (
    <Mainscreen title="REGISTER">
       <div>
       {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
       {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
       {loading && <Loading/>}
       <Form onSubmit={submitHandler}>
       <Form.Group className="mb-3" controlId="formBasicName">
         <Form.Label>name</Form.Label>
         <Form.Control type="name" 
          value={name}
          onChange={e=>setName(e.target.value)}
         placeholder="Enter name" />
       </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>Email address</Form.Label>
         <Form.Control type="email" 
         value={email}
         onChange={e=>setEmail(e.target.value)}
         placeholder="Enter email" />
       </Form.Group>
   
       <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Label>Password</Form.Label>
         <Form.Control type="password" 
         value={password}
         onChange={e=>setPassword(e.target.value)}
         placeholder="Password" />
       </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
         <Form.Label>Confirm Password</Form.Label>
         <Form.Control type="password" 
         value={comfirmPassword}
         onChange={e=>setcomfirmPassword(e.target.value)}
         placeholder="Confirm Password" />
       </Form.Group>
       {
        picMessage && (
          <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
        )
       }
       <Form.Group controlId="formFile" className="mb-3">
           <Form.Label>Profile picture</Form.Label>
           <Form.Control type="file" 
           onChange={(e)=>postDeatails(e.target.files[0])}
           />
         </Form.Group>
       <Button variant="primary" type="submit">
         Submit
       </Button>
     </Form>
     <Row className='py-3'>
     New Customer ? <Link to='/login'>Login</Link>
   </Row>
       </div>
    </Mainscreen>
  );
};

export default Register;
