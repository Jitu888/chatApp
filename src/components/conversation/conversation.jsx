import React,{useEffect, useState} from 'react';
import axios from 'axios'
import './conversation.css'

const Conversation = ({conversation,currentUser}) => {
      //  console.log("0000000000000000000000000000000000",conversation,currentUser._id)
  const [user,setUser] = useState(null);

 useEffect(()=>{
    const friendId = conversation.members.find((m)=>m !== currentUser._id)
    //  console.log("2222222222222222222222222222222222",friendId)
    const getUser = async() =>{
      try{
      const res = await axios.get(`http://localhost:1111/user?id=${friendId}`)
      //  console.log("12345678",res)
      setUser(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getUser();
 },[currentUser,conversation])

 


  return (
    <div className='conversation'>
        <img className='conversationImg' src="https://pbs.twimg.com/profile_images/1372929127754432512/kIyMIxbT_400x400.jpg" alt="" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation