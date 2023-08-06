import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Row } from 'react-bootstrap';
import Mainscreen from '../component/MainScreen';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../component/ErrorMessage';
import Loading from '../component/Loading';
import { login } from '../actions/userAction.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const dispatch = useDispatch(); //!redux
  let navigate = useNavigate();
  // const userLogin = useSelector((state)=>state.userLogin) //!redux
  // const {loading,error,userInfo} = userLogin  //!redux
  const submitHandler = async (e) => {
    e.preventDefault();
    //  dispatchEvent(login(email,password)) //!redux
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log(data);
      setLoading(false);

      // Use the navigate function to navigate to '/mynotes'
      navigate('/mynote', { replace: true });
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Mainscreen title="LOGIN">
      <div className="container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          New Customer ? <Link to="/register">Register here</Link>
        </Row>
      </div>
    </Mainscreen>
  );
};

export default Login;
