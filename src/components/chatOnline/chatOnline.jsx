import React from 'react';
import { useEffect ,useState} from 'react';
import './chatOnline.css';
import axios from 'axios'

const ChatOnline = ({onlineFriend,currentId,setCurrentChat}) => {
    //  console.log("7777777777777777777",online,currentuser)
    const[friend,setfriend] = useState([]);
    const[onlineFriends , setOnlineFriend] = useState([]);

    useEffect(()=>{

        const getFriends = async() =>{
            
                const res = await axios.get(`http://localhost:1111/follower?id=${currentId}`);
                setfriend(res.data.friendList)
                //  console.log("177777",res.data.friendList)
           
        };
        getFriends();

    },[currentId]);

   useEffect(()=>{
       setOnlineFriend(friend.filter((f)=>onlineFriend.includes(f._id)))
   },[friend,onlineFriend])
  
   const handleClick = async(user)=>{
      try{
         
      }
      catch(err){
        console.log(err)
      }
   }
  
   
  return (
    <div className="chatOnline">
        {onlineFriends.map((on)=>{
           return(
            <div className="chatOnlineFriend" onClick={handleClick}>
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src="https://pbs.twimg.com/profile_images/1372929127754432512/kIyMIxbT_400x400.jpg" alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className='chatOnlineName'>{on.username}</span>
        </div>
        )})}
       
     
    </div>
  )
}

export default ChatOnline