import React,{useEffect,useState,useContext}from 'react'
import {UserContext} from '../../App'

const Profile =()=>{
    const[mypic,setMyPic] = useState([])
    const[state,dispatch] = useContext(UserContext)
    useEffect(()=>{
    fetch('http://localhost:5000/mypost',
    {
        headers:{
            Authorization:"Bearer "+localStorage.getItem('jwt')
        }
    }).then(res=>res.json())
      .then(result=>{
        console.log(result.photo)
        setMyPic(result.photo)
      })
    },[])
return(
    <div >
        <div  style={{maxwidth:"550px",margin:"0px auto"}}>
          <div style={{display:"flex",
                        justifyContent:"space-around",
                        margin:"18px 0px",
                        borderBottom:"1px solid grey"

               }}>
                <img style={{width:'160px',height:'160px',borderRadius:'80px'}}
                src='https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D'
                />
        
                <div>
                       <h4>{state.name}</h4>
                       <div style={{display:"flex",justifyContent:"space-around",width:"113%"}}>
                        <h6>40 posts</h6>
                        <h6>40 follower</h6>
                        <h6>40 following</h6>
                       </div>
                </div>
               
               
             
           
            </div>
        </div>
        <div className='gallery'>
               {
                 mypic.map(item=>{
                    return(
                        <img className='item' src={item.photo} alt={item.title}/>
                    )
                 })
               }

            
            
        </div>
    </div>
)
}

export default Profile