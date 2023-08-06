import './App.css';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage'
import Login from './screens/Login'
import Register from './screens/Register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyNotes from './screens/MyNote/MyNote';
import CreateNote from './screens/CreateNote';
import SingleNote from './screens/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen';
function App() {
  const [search,setSearch] = useState('')
  return (
    <BrowserRouter>
    <Header   setSearch={setSearch}/>
    <Routes>
      
       <Route path='/' element={<LandingPage/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/profile' element={<ProfileScreen/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/create' element={<CreateNote/>}/>
       <Route path='/create' element={<CreateNote/>}/>
       <Route path='/note/:id' element={<SingleNote/>}/>
       <Route path='/mynote' element={<MyNotes search={search}/>}/>
      </Routes>
      <Footer/>

    </BrowserRouter>
  );
}

export default App;
