import axios from 'axios'
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_SUCCESS } from '../constants/notesConstant'
export const listNote =()=> async(dispatch,getState)=>{
    try{
        dispatch({
            type:NOTES_LIST_REQUEST
        })
        const {
            userLogin:{userInfo}
        }=getState()
        const config ={
            headers:{
                Authorization:`Bearer ${userInfo}`
            }
        }
        const {data} = await axios.get('http://localhost:5000/api/note',config)
      dispatch({
        type:NOTES_LIST_SUCCESS,
        payload:data
      })
    }catch(error){
        const message = 
            error.response && error.response.data.message 
              ? error.message.data.message
              :error.message;

              dispatch({
                type:NOTES_LIST_FAIL,
                payload:message
              })
    }
}


export const createNoteAction= (title,content,categiry)=> async(dispatch,getState)=>{
  try {
      dispatch({type:NOTES_CREATE_REQUEST})
      const {userLogin:{userInfo}} = getState()
      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization :`Beare ${userInfo}`
        }
      }
      const {data} = await axios.post('http://localhost:5000/api/note/create',{title,content,categiry},config)
      dispatch({
        type:NOTES_CREATE_SUCCESS,
        payload:data
      })
  } catch (error) {
    const message = 
            error.response && error.response.data.message 
              ? error.message.data.message
              :error.message;

              dispatch({
                type:NOTES_CREATE_FAIL,
                payload:message
              })
    
  }
}

export const updateNoteAction =(id,title,content,category)=>async(dispatch,getState)=>{
  try{
      dispatch({type:NOTES_UPDATE_SUCCESS})
      const {userLogin:{userInfo}} = getState()
      const config={
        headers:{
          "Content-type":'application/json',
          Authorization:`Bearer ${userInfo}`
        }
      }
      const {data} = axios.put(`http://localhost:5000/api/note/${id}`,{title,content,category},config)
      dispatch({
        type:NOTES_UPDATE_SUCCESS,
        payload:data
      })
    }catch(error){
      dispatch({
          type:NOTES_UPDATE_FAIL,
          payload:
             error.response && error.response.data.message
               ?error.response.data.message 
               :error.message
      })
  }
}

export const deleteNoteAction =(id)=>async(dispatch,getState)=>{
  try {
    dispatch({type:NOTES_DELETE_SUCCESS})
      const {userLogin:{userInfo}} = getState()
      const config={
        headers:{
          "Content-type":'application/json',
          Authorization:`Bearer ${userInfo}`
        }
      }
      const {data} = axios.delete(`http://localhost:5000/api/note/${id}`,config)
      dispatch({
        type:NOTES_DELETE_SUCCESS,
        payload:data
      })
  } catch (error) {
    dispatch({
      type:NOTES_DELETE_FAIL,
      payload:
         error.response && error.response.data.message
           ?error.response.data.message 
           :error.message
  })
  }
}