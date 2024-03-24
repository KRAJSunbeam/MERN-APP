
import React,{useContext} from 'react'
import "../App.css"
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar =()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate =useNavigate
  const renderList =()=>{
    if(state){
      console.log(state)
     return [
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/create">Create</Link></li>,
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
  onClick={() => {
    console.log("working");
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    window.location.href='/login'
  }}
>
  Logout
</button>

     ]
    }else{
     return[
      <li><Link to="/login">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>
     ]
    }
  }
    return(
        <nav>
    <div className="nav-wrapper white" >
      <Link to= {state?'/':"/login"} className="brLinknd-logo left">Friends-System-Enhancement</Link> 
      <ul id="nav-mobile" className="right hide-on-med-and-down">
             {renderList()}
      </ul>
    </div>
  </nav>
        
    )
}


export default NavBar