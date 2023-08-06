import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';

function Header({setSearch}) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  // const dispatch = useDispatch() //!using redux
//  const userLogin = useSelector((state)=>state.userLogin) //!using redux
  //  const logoutHandler=()=>{
  //   dispatch(logout())
  //   redirect('/')
  //  }  //!using redux

  return (
    <Navbar bg='primary' expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Replace href with Link */}
        <Navbar.Brand><Link to='/'>folly with RoadSideCoder</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className='m-auto'>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={e =>setSearch(e.target.value )}
              />
            </Form>
          </Nav>
             {
              userInfo ?
              <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
            <Nav.Link><Link to='/mynote'>My Notes</Link></Nav.Link>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item><Link to='/profile'>My Profile</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => {
                localStorage.removeItem('userInfo');
                navigate('/', { replace: true });
              }}>
                log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>:<Nav><Nav.Link><Link to='/login'>login</Link></Nav.Link></Nav>
             }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
