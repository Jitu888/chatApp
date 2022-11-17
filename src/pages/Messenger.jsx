import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios'
import './messenger.css';
import Conversation from '../components/conversation/conversation'
import Message from '../components/message/message';
import ChatOnline from '../components/chatOnline/chatOnline'
import { AuthContext } from '../context/AuthContext';
import { io } from "socket.io-client";




const Messenger = () => {
    const [Conversations, setConversation] = useState([])
    const [CurrentChat, setCurrentChat] = useState([])
    const [Messages, setMessages] = useState([])
    const [NewMessage, setNewMessaage] = useState('')
    const [ArrivalMessage, setArrivalMessaage] = useState(null)
    const [onlineFriend, setOnlineFriend] = useState([])
    const socket = useRef();
    const { user } = useContext(AuthContext)
    const scrollRef = useRef();

    
    //  console.log("current",onlineFriend);

    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.on("getMessage", data => {
            //  console.log("1234567567")
            setArrivalMessaage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()

            })
        })
    }, [])


    useEffect(() => {
        // console.log("asdfghjkl;;;;;;;;;;;;;;;;")
        ArrivalMessage && CurrentChat.members?.includes(ArrivalMessage.sender) &&
            setMessages((prev) => [...prev, ArrivalMessage])
    }, [ArrivalMessage, CurrentChat])


    useEffect(() => {
        //  console.log("/////////////////////333333333333////////////",user._id)
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", (users) =>{
            setOnlineFriend(user.followings.filter((f)=>users.some((u)=>u.userId === f)))}

        )
    }, [user])





    useEffect(() => {

        const getConversation = async () => {
            try {
                const res = await axios.get(`http://localhost:1111/getCon?id=${user._id}`)
                // console.log(res)

                setConversation(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getConversation();
    }, [user._id]);


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:1111/recievemessage?id=${CurrentChat._id}`);
                setMessages(res?.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMessages();
    }, [CurrentChat])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const msg = {
            sender: user._id,
            text: NewMessage,
            conversationId: CurrentChat._id
        };

        const receiverId = CurrentChat?.members?.find(member => member !== user._id)
        // console.log("jitu////////////", receiverId)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: NewMessage
        })

        try {
            const res = await axios.post("http://localhost:1111/sendmessage", msg)
            setMessages([...Messages, res.data])
        }
        catch (err) {
             console.log(err)
        }
        
    }




    useEffect(() => {

        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" })
    }, [Messages])


    // console.log("125",user._id)

    return (
        <>
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='search For friends' className='chatMenuInput' />
                        {Conversations.map((c) => (
                            <div onClick={() => {setCurrentChat(c)}}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}



                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            CurrentChat._id?
                                <>
                                    <div className="chatBoxTop">
                                        <div ref={scrollRef} >
                                            {Messages.map((m) => (<Message message={m} own={m.sender === user._id} />))}
                                        </div>

                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className='chatMessageInput' placeholder='write something...' onChange={(e) => (setNewMessaage(e.target.value))} value={NewMessage}></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                    </div>
                                </> : <span className='noConversationText'>Open a conversation to start a chat</span>}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineFriend={onlineFriend} currentId={user?._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Messenger;