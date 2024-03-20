import MemberChat from "../../composants/memberChat";
import Navbar from "../../composants/navbar";
import io from "socket.io-client";
import { useEffect, useState, useRef, useContext } from "react";
import Message from "../../composants/message";
import { UpdateContext } from "../../utils/updateContext";

function Chat(){
    const token = localStorage.getItem("token");
    const [allUsers, setAllUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState([])
    const {update, setUpdate} = useContext(UpdateContext)
    const messagesEndRef = useRef(null);

    useEffect(()=>{
        const newSocket = io("http://192.168.1.146:3030");
        setSocket(newSocket);

        async function GetAllUsers(){
            try{
                const response = await fetch("http://192.168.1.146:3030/groupehbk/getallusers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.status === 200){
                    const responseData = await response.json();
                    setAllUsers(responseData.allUsers);
                }
            }
            catch(err){
                console.log(err);
            }
        }
        GetAllUsers()

        return () => {
            newSocket.disconnect();
        };
    }, [token])

    useEffect(()=>{
        async function GetAllMessages(){
            try{
                const response = await fetch("http://192.168.1.146:3030/groupehbk/getallmessages", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    const responseData = await response.json()
                    setAllMessages(responseData.allMessages)
                    scrollToBottom()
                }
            }
            catch(err){
                console.log(err)
            }
        }
        GetAllMessages()
    }, [update, token])

    useEffect(() => {
        if (socket) {
            socket.on("message", (data) => {
                setAllMessages((prevMessages) => [...prevMessages, data])
                scrollToBottom()
            })
        }
    }, [socket])

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    async function SendMessage(){
        try{
            if(message !== ""){
                socket.emit("message", {
                    username: localStorage.getItem("username"),
                    content: message
                })
                const response = await fetch("http://192.168.1.146:3030/groupehbk/addmessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        content: message
                    })
                })
                if(response.status === 200){
                    console.log("Message enregistré")
                    setUpdate(!update)
                    setMessage("")
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            SendMessage()
        }
    }

    return(
        <div className="chat">
            <div className="chat__conversations">
                <div className="chat__conversations__head">
                    <i className="fa-solid fa-user-group"></i> Membres
                </div>
                <div className="chat__conversations__content">
                    {allUsers.map((user) => (
                        <MemberChat key={user.id} user={user} />
                    ))}
                </div>
                <div className="chat__conversations__foot">
                    <input type="text" placeholder="Rechercher un membre"/>
                </div>
            </div>
            <div className="chat__content">
                <div className="chat__content__title">Groupe HBK - Chat</div>
                <div className="chat__content__messages" id="messages_container">
                    {
                        allMessages.map(
                            (elmt) => (
                                <Message message={elmt}/>
                            )
                        )
                    }
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat__content__message_input">
                    <input type="text" name="" id="clavier" placeholder="Ecrire un message..." value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyDown={(event)=>{handleKeyDown(event)}}/>
                    <div className="btn_send" onClick={()=>{SendMessage()}}><i className="fa-regular fa-paper-plane"></i>Envoyer</div>
                </div>
            </div>
            <Navbar/>
        </div>
    );
}

export default Chat;
