import React, { useState } from 'react'
import MainScreen from '../component/MainScreen'
import ReactMarkDown from 'react-markdown'
import axios from 'axios'
import ErrorMessage from '../component/ErrorMessage'
// import { useDispatch } from 'react-redux'  //! using redux
 import { Button, Card, Form } from 'react-bootstrap'
import Loading from '../component/Loading'
import { useNavigate, useNavigation } from 'react-router-dom'
import { createNoteAction } from '../actions/notesAction'
const CreateNote = () => {

    
    // const [title,setTitle]= useState('')
    // const [content, setcontent] = useState('')
    // const [category, setCategory] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    // const dispatch = useDispatch()  //!using redux
    // const noteCreate = useSelector((state)=>state.noteCreate) //!using redux
    ///const {loading,error,note}= noteCreate    //!
    //  const resetHandler=()=>{
    //     setTitle('')
    //     setCategory('')
    //     SVGTextContentElement('')
    //  }   //! using redux


    // const submitHandler =(e)=>{
    //         e.preventDefault()
    //         dispatchEvent(createNoteAction(title,content,category))
    //         if(!title || !content || !category) return;
    //         resetHandler()
    //         navigate('/mynote')
    //     }
     const [test,setTest]= useState({
        title:'',
        content:'',
        category:''
    })

    
    let navigate = useNavigate();
    
    

    const handleChange =(e)=>{
        e.preventDefault()
        setTest({
            ...test,
            [e.target.name]:e.target.value
        })
    }
    const {title,content,category} = test
      
    const submitHndler = async(e)=>{
      e.preventDefault()
      setLoading(true)
      if (title.trim() === '' || content.trim() === '' || category.trim() === '') {
        alert('All fields are required.'); // You can display an error message or handle the validation as per your UI design.
        setLoading(false)
        handleReset()
        return;
      }
        try {

            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const {token} = userInfo
            const config={
              headers:{
                  "Content-type":"application/json",
                  Authorization:`Bearer ${token}`
              }
            }
            setLoading(true)
                const res=  await axios.post('http://localhost:5000/api/note/create',{title,content,category},config)
            console.log(title,content,category)
            console.log(res)
            navigate('/mynote',{replace:true})
            handleReset()
            
            
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
            
        }
    }

    const handleReset =()=>{
        setTest({
            ...test,
            title:'',
            content:'',
            category:''
    
          })
    }
  
  
    return (
    <MainScreen title='Create note'>
      <Card>
        <Card.Header>Create a new note</Card.Header>
        <Card.Body>
           <Form onSubmit={submitHndler}>
              {error && <ErrorMessage variant='dange'>{error}</ErrorMessage>}
              <Form.Group controlId='title'>
               <Form.Label>Title</Form.Label>
               <Form.Control type='title' name='title' value={title} onChange={handleChange} placeholder='enter a title'/>
              </Form.Group>
              <Form.Group controlId='content' >
               <Form.Label>content</Form.Label>
               <Form.Control type='content' as='textarea' rows={4} name='content' value={content} onChange={handleChange} placeholder='enter a content'/>
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
               <Button type='submit' variant='primary'>Crete Note</Button>
               <Button  variant='primary' className='mx-2' onClick={handleReset}>Reset field</Button>
              </Form>
        </Card.Body>
         <Card.Footer className='text-muted'>
         creating on - {new Date().toLocaleDateString()}</Card.Footer>
      </Card>
    </MainScreen>
  )
}

export default CreateNote