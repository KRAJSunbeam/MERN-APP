import React,{useEffect,createContext,useReducer} from 'react'
import NavBar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer ,initialState} from './reducer/userReducer'

 export const UserContext= createContext()

 const Routing =()=>{
   
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      // window.location.href='/'
    }else{
    //  window.location.href ='/login'
    }
   },[])

  return (
    <>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path ='/create' element={<CreatePost/>}/>
      </Routes>
    </>
  )
 }

function App() {
 

  const[state,dispatch]= useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
     <Routing/>
    </BrowserRouter>
  </UserContext.Provider>
  
  );
}


export default App;
