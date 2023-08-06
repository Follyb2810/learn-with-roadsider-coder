import React, { useEffect, useState } from 'react'
import MainScreen from '../component/MainScreen'
import ReactMarkDown from 'react-markdown'
import axios from 'axios'
import ErrorMessage from '../component/ErrorMessage'
// import { useDispatch } from 'react-redux'  //! using redux
 import { Button, Card, Form } from 'react-bootstrap'
import Loading from '../component/Loading'
import { Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { createNoteAction, updateNoteAction } from '../actions/notesAction'
const SingleNote = () => {
//    const [title,setTitle] =useState()
//    const [content,setContent] =useState()
//    const [category,setCategory] =useState()
   const [date,setDate] =useState('')
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)
   const { id } = useParams();
   const navigate = useNavigate()
   

//    const dispatch = useDispatch()  //!using reduc
//    const noteUpdate = useSelector((state)=>state.noteUpdate) //!using redux
// const { loading,error} = noteUpdate
   const [test,setTest]= useState({
    title:'',
    content:'',
    category:''
})
const {title,content,category} = test
const handleChange =(e)=>{
    e.preventDefault()
    setTest({
        ...test,
        [e.target.name]:e.target.value
    })
}

// useEffect(()=>{
//     const  fetch = async ()=>{
//         const {data} = await axios.get(`http://localhost:5000/api/note/${id}`)
//         setTest({
//             ...test,
//             title:data.title,
//             content:data.content,
//             category:data.category
    
//           })
//           setDate(data.updateAt)

//     }
//     fetch()
// },[test,id,date])
useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/note/${id}`);
        setTest({
          title: data.title,
          content: data.content,
          category: data.category
        });
        setDate(data.updatedAt); // Assuming you have a state variable 'date' and you are setting it here
      } catch (error) {
        console.error(error);
      }
    };
    fetchNote();
  }, [id]);
const handleReset =()=>{
    setTest({
        ...test,
        title:'',
        content:'',
        category:''

      })
  
}

// const updateHandler =(e)=>{
//     e.preventDefault()
//     dispatchEvent(updateNoteAction(id,title,content,category))
//     if(!title || !content || !category) return
//     handleReset()
//     navigate('/mynote',{replace:true})
// }  //! using axios

// const updateHandler =async(e)=>{
//     e.preventDefault()
//     if(!title || !content || !category){
//         alert('All fields are required.'); // You can display an error message or handle the validation as per your UI design.
//         setLoading(false)
//         handleReset()
//         return;
//     } 
//     try {
//         const userInfo = JSON.parse(localStorage.getItem('userInfo'))
//         const {token} = userInfo
//         const config ={
//             headers:{
//                 "Content-type":"application/json",
//                 Authorization:`Bearer ${token}`
//             }
//         }
//           const {res} = await axios.put(`http://localhost:5000/api/note/${id}`,{title,content,category},config)
//           console.log(res)
          


//     } catch (error) {
//         setError(error.response.data.message);
//         setLoading(false);
//     }
//     handleReset()
//     navigate('/mynote',{replace:true})
// }  

const updateHandler = async (e) => {
    e.preventDefault();
    if (!test.title || !test.content || !test.category) {
      alert('All fields are required.');
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { token } = userInfo;
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.put(`http://localhost:5000/api/note/${id}`, test, config);
      console.log(data);

      // Update the state after the successful update
      setTest({
        title: data.title,
        content: data.content,
        category: data.category
      });

      navigate('/mynote', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainScreen title='Edit note note'>
      <Card>
        <Card.Header>Create a new note</Card.Header>
        <Card.Body>
           <Form onSubmit={updateHandler} >
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
              <Form.Group controlId='title'>
               <Form.Label>Title</Form.Label>
               <Form.Control type='title' name='title' value={title} onChange={handleChange} placeholder='enter a title'/>
              </Form.Group>
              <Form.Group controlId='content' >
               <Form.Label>content</Form.Label>
               <Form.Control type='content' as='textarea' rows={4} name='content' value={content} onChange={handleChange}  placeholder='enter a content'/>
              </Form.Group>
              {
                content && (
                    <Card className='mt-2'>
                      <Card.Header>Note Preview</Card.Header>
                      <Card.Body>
                        <ReactMarkDown>{content}</ReactMarkDown>
                      </Card.Body>
                    </Card>
                )
              }
              <Form.Group controlId='category' className='mb-2'>
               <Form.Label>category</Form.Label>
               <Form.Control type='category' name='category' value={category} onChange={handleChange} placeholder='enter a category'/>
              </Form.Group>
               {loading && <Loading size={50}/>}
               <Button type='submit' variant='primary'>update Note</Button>
               <Button  variant='primary' className='mx-2' onClick={handleReset}>Reset field</Button>
              </Form>
        </Card.Body>
         <Card.Footer className='text-muted'>
        updated on - {date.substring(0,10)}</Card.Footer>
      </Card>
    </MainScreen>
  )
}

export default SingleNote