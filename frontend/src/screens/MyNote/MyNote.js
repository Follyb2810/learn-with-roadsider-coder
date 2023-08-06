import React, { useEffect, useState } from 'react';
import MainScreen from '../../component/MainScreen';
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import listNotes, { deleteNoteAction } from '../../actions/notesAction';
import Loading from '../../component/Loading';
import axios from 'axios';
import ErrorMessage from '../../component/ErrorMessage';

const MyNote = ({search}) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     // TODO: Implement delete functionality
  //     dispatchEvent(deleteNoteAction(id))
  //   }
  // }; ///using redux
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { token } = userInfo; // Corrected the way to access the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.delete(`http://localhost:5000/api/note/${id}`, config);
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        // fetchNote()
        setLoading(false);
        // TODO: Add any further logic after successful deletion
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  };
  
//  const noteDelete = useSelector((state)=>state.noteDelete) //! using redux
//  const {loading:loadingDelet,error:errorDelete,success:sucessDelet} =noteDelete  ////! using redu
  const fetchNote = async () => {
    try {
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      if (!userInfo) {
        return;
      }

      const { token } = userInfo;
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLoading(false);
      console.log(data);
      setNotes(data.reverse());
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNote();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
    if(!userInfo)
     navigate('/',{replace:true})

    
  
  }, [navigate]);

  return (
    <MainScreen title='Welcome Folly'>
      <Link to="/create">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {loading && <Loading />}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {notes.filter(filternote =>filternote.title.toLowerCase().includes(search.toLowerCase())).map((note, index) => (
        <Accordion key={note._id}>
          <Card>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header>{note.title}</Accordion.Header>
              </span>
              <div>
                <Button ><Link to={`/note/${note._id}`}>Edit</Link></Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body>
              <Card.Body>
                <h4>
                  <Badge variant="success">
                    Category - {note.category}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  {note.content}
                  <footer className="blockquote-footer">
                    Created on{" "}
                    {note.createdAt.substring(0,10)}
                     {new Date(note.createdAt).toLocaleDateString()}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNote;