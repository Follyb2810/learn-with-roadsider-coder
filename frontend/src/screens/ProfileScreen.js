// import React, { useEffect, useState } from 'react'
// import MainScreen from '../component/MainScreen'
// import ErrorMessage from '../component/ErrorMessage'
// import { Button, Col, Form, Row } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// // import { updateProfile } from '../actions/userAction'
// import Loading from '../component/Loading'
// import axios from 'axios'
// // import { useDispatch, useSelector } from 'react-redux'
// const ProfileScreen = () => {
//     const navigate = useNavigate()
//     const [name,setName]=useState('')
//     const [loading,setLoading]=useState(false)
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     const [conPassword,setConPassword]=useState('')
//     const [pic,setPic]=useState()
//     const [picMessage,setPicMessage]=useState()
//     const [error,setError]=useState()

//     // const dispatch = useDispatch()
//     // const useLogin = useSelector((state)=>state.userLogin)
//     // const userUpdate = useSelector((state)=>state.userUpdate)
//     // const {loading,error,success} = userUpdate
//     // useEffect(()=>{
//     //     if(!userInfo){
//     //       navigate('/',{replace:true})
//     //     }else{
//     //         setName(userInfo.name);
//     //         setEmail(userInfo.email)
//     //         setPic(userInfo.pic)
//     //     }
//     // },[navigate,userInfo])  //!using axios

//     // const submitHandler = (e)=>{
//     //     e.preventDefault()
//     //     if(password === conPassword)
//     //     dispatchEvent(updateProfile({name,email,password,pic}))
//     // } //! using redux
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//     useEffect(() => {
//       if (!userInfo) {
//         navigate('/', { replace: true });
//       } else {
//         setName(userInfo.name);
//         setEmail(userInfo.email);
//         setPic(userInfo.pic);
//       }
//     }, [navigate, userInfo]);
    
//     const submitHandler = async (e) => {
//       e.preventDefault();
//       try {
//         setLoading(true);
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };
    
//         const { data } = await axios.post('http://localhost:5000/api/user/profile', { name, email, password, pic }, config);
//         await axios.post('http://localhost:5000/api/user/login', { email, password }, config);
//         navigate('/mynote', { replace: true });
//         // Update the userInfo in localStorage with the new data received from the server
//         localStorage.setItem("userInfo", JSON.stringify(data));
    
//         console.log(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.response.data.message);
//         setLoading(false);
//       }
//     };
    
    
    
//     const postDeatails =(pics)=>{
//         if(!pics){
//           return setPicMessage('please select pics')
//         }
//         if(pics.type === "image/jpeg" || pics.type === "image/png"){
//           const data = new FormData()
//           data.append("file",pics)
//           data.append("upload_preset","follyb")
//           data.append("cloud_name","folly")
//           fetch('https://api.cloudinary.com/v1_1/folly/image/upload',{
//             method:'post',
//             body:data
//           }).then((res)=>res.json()).then((data)=>{
//             console.log(data)
//             setPic(data.url.toString())
//           }).catch((err)=>{
//             console.log(err)
//           })
//         }else{
//           return setPicMessage('please select an image')
//         }
//       }
//     return (
//     <MainScreen title='EDIT PROFILE'>
//      <div>
//      <Row className='profileContainer'>
//       <Col md={6} sm={12}>
//       <Form onSubmit={submitHandler}>
//       {loading && <Loading/>}
//       {
//         error && (
//             <ErrorMessage variant='danger'>{error}</ErrorMessage>
//         )
//     }
//           <Form.Group control='name'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='enter name'
//             value={name}
//             onChange={e=>setName(e.target.value)}
//           />
//           </Form.Group>
//           <Form.Group control='email'>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='enter your emai'
//             value={email}
//             onChange={e=>setEmail(e.target.value)}
//           />
//           </Form.Group>
//           <Form.Group control='password'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='enter password'
//             value={password}
//             onChange={e=>setPassword(e.target.value)}
//           />
//           </Form.Group>
//           <Form.Group control='confirmPassword'>
//           <Form.Label>confirm Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='confirm password'
//             value={conPassword}
//             onChange={e=>setConPassword(e.target.value)}
//           />
//           </Form.Group>
//           <Form.Group controlId="formFile" className="mb-3">
//           <Form.Label>Profile picture</Form.Label>
//           <Form.Control type="file" 
//           onChange={(e)=>postDeatails(e.target.files[0])}
//           />
//         </Form.Group>
//         {
//             picMessage && (
//                 <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
//             )
//         }
//         <Button variant="primary" type="submit">
//          Submit
//        </Button>
//         </Form>
//       </Col>
//       <Col md={6} sm={12} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
//       <img src={pic} alt={pic}/> 
//       </Col>
//      </Row>
//      </div>
//     </MainScreen>
//   )
// }

// export default ProfileScreen


import MainScreen from '../component/MainScreen'
import ErrorMessage from '../component/ErrorMessage'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loading from '../component/Loading'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [pic, setPic] = useState('');
  const [picMessage, setPicMessage] = useState('');
  const [error, setError] = useState('');

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate('/', { replace: true });
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/user/profile', { name, email, password, pic }, config);
      await axios.post('http://localhost:5000/api/user/login', { email, password }, config);
      navigate('/mynote', { replace: true });

      localStorage.setItem("userInfo", JSON.stringify(data));

      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage('Please select a picture');
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "follyb")
      data.append("cloud_name", "folly")
      fetch('https://api.cloudinary.com/v1_1/folly/image/upload', {
        method: 'post',
        body: data
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        setPic(data.url.toString())
      }).catch((err) => {
        console.log(err)
      })
    } else {
      return setPicMessage('Please select an image');
    }
  }

  return (
    <MainScreen title='EDIT PROFILE'>
      <Row className='profileContainer'>
        <Col md={6} sm={12}>
          <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            {error && (
              <ErrorMessage variant='danger'>{error}</ErrorMessage>
            )}
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>name</Form.Label>
            <Form.Control type="name" 
             value={name}
             onChange={e=>setName(e.target.value)}
            placeholder="Enter name" />
          </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Profile picture</Form.Label>
              <Form.Control type='file'
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6} sm={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={pic} alt={pic} className='profilePic' />
        </Col>
      </Row>
    </MainScreen>
  );
}

export default ProfileScreen;
